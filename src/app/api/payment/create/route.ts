export const dynamic = 'force-dynamic'                                                                                                           
                                                                                                                                                    
   import { NextRequest, NextResponse } from 'next/server'                                                                                          
   import { supabaseAdmin } from '@/lib/supabase'                                                                                                   
                                                                                                                                                    
   const APP_URL = process.env.NEXT_PUBLIC_APP_URL!                                                                                                 
   const PRECIO = parseFloat(process.env.PRECIO_AR S || '8900')                                                                                     
                                                                                                                                                    
   export async function POST(req: NextRequest) {                                                                                                   
     try {                                                                                                                                          
       const { generationId, selectedSong } = await req.json()                                                                                      
                                                                                                                                                    
       if (!generationId || !['a', 'b'].includes(selectedSong)) {                                                                                   
         return NextResponse.json({ error: 'Parametros invalidos' }, { status: 400 })                                                               
       }                                                                                                                                            
                                                                                                                                                    
       const { data: generation, error: genError } = await supabaseAdmin                                                                            
         .from('generations')                                                                                                                       
         .select('id, brand_name, suno_status')                                                                                                     
         .eq('id', generationId)                                                                                                                    
         .single()                                                                                                                                  
                                                                                                                                                    
       if (genError || !generation) {                                                                                                               
         return NextResponse.json({ error: 'Generacion no encontrada' }, { status: 404 })                                                           
       }                                                                                                                                            
                                                                                                                                                    
       if (!['stream_ready', 'complete'].includes(generation. suno_status)) {                                                                       
         return NextResponse.json({ error: 'La cancion todavia no esta lista' }, { status: 409 })                                                   
       }                                                                                                                                            
                                                                                                                                                    
       const { data: payment, error: payError } = await supabaseAdmin                                                                               
         .from('payments')                                                                                                                          
         .insert({                                                                                                                                  
           generation_id: generationId,                                                                                                             
           selected_song: selectedSong,                                                                                                             
           amount_ars: PRECIO,                                                                                                                      
           mp_status: 'pending',                                                                                                                    
         })                                                                                                                                         
         .select('id, download_token')                                                                                                              
         .single()                                                                                                                                  
                                                                                                                                                    
       if (payError || !payment) {                                                                                                                  
         throw payError                                                                                                                             
       }                                                                                                                                            
                                                                                                                                                    
       const { MercadoPagoConfig, Preference } = await import('mercadopago')                                                                        
                                                                                                                                                    
       const client = new MercadoPagoConfig({                                                                                                       
         accessToken: process.env.MP_ACCESS_TOKEN!,                                                                                                 
       })                                                                                                                                           
                                                                                                                                                    
       const preference = new Preference(client)                                                                                                    
                                                                                                                                                    
       const result = await preference.create({                                                                                                     
         body: {                                                                                                                                    
           items: [                                                                                                                                 
             {                                                                                                                                      
               id: generationId,                                                                                                                    
               title: `Jingle MP3 para ${generation.brand_name}`,                                                                                   
               description: `Cancion personalizada opcion ${selectedSong.toUpperCase()}`,                                                           
               quantity: 1,                                                                                                                         
               currency_id: 'ARS',                                                                                                                  
               unit_price: PRECIO,                                                                                                                  
             },                                                                                                                                     
           ],                                                                                                                                       
           back_urls: {                                                                                                                             
             success: `${APP_URL}/descarga?token=${payment.download_token}`,                                                                        
             failure: `${APP_URL}/pago-fallido?generationId=${generationId}`,                                                                       
             pending: `${APP_URL}/pago-pendiente?generationId=${generationId}`,                                                                     
           },                                                                                                                                       
           auto_return: 'approved',                                                                                                                 
           notification_url: `${APP_URL}/api/webhooks/mercadopago`,                                                                                 
           metadata: {                                                                                                                              
             payment_id: payment.id,                                                                                                                
             generation_id: generationId,                                                                                                           
             selected_song: selectedSong,                                                                                                           
           },                                                                                                                                       
           payment_methods: {                                                                                                                       
             installments: 1,                                                                                                                       
           },                                                                                                                                       
         },                                                                                                                                         
       })                                                                                                                                           
                                                                                                                                                    
       if (!result.id) {                                                                                                                            
         throw new Error('MercadoPago no devolvio ID')                                                                                              
       }                                                                                                                                            
                                                                                                                                                    
       await supabaseAdmin                                                                                                                          
         .from('payments')                                                                                                                          
         .update({ mp_preference_id: result.id })                                                                                                   
         .eq('id', payment.id)                                                                                                                      
                                                                                                                                                    
       return NextResponse.json({                                                                                                                   
         preferenceId: result.id,                                                                                                                   
         checkoutUrl: result.init_point,                                                                                                            
         sandboxUrl: result.sandbox_init_point,                                                                                                     
       })                                                                                                                                           
                                                                                                                                                    
     } catch (err: any) {                                                                                                                           
       console.error('[Payment] Error:', err.message)                                                                                               
       return NextResponse.json({ error: 'Error al crear el pago' }, { status: 500 })                                                               
     }                                                                                                                                              
   }                       
