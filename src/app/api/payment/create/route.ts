export const dynamic = 'force-dynamic'                                                                                                           
                                                                                                                                                    
   import { NextRequest, NextResponse } from 'next/server'                                                                                          
   import { supabaseAdmin } from '@/lib/supabase'                                                                                                   
                                                                                                                                                    
   const APP_URL = process.env.NEXT_PUBLIC_APP_URL!                                                                                                 
   const PRECIO = parseFloat(process.env.PRECIO_ARS || '8900')                                                                                     
                                                                                                                                                    
   export async function POST(req: NextRequest) {                                                                                                   
     try {                                                                                                                                          
       const { generationId, selectedSong, couponCode, utmParams } = await req.json()

       if (!generationId || !['a', 'b'].includes(selectedSong)) {
         return NextResponse.json({ error: 'Parametros invalidos' }, { status: 400 })
       }

       // Resolver descuento si hay cupón (percent o fixed)
       let finalPrice = PRECIO
       let discountAmount = 0
       let validatedCouponCode: string | null = null

       if (couponCode) {
         const { data: coupon } = await supabaseAdmin
           .from('coupons')
           .select('id, discount_type, discount_value, max_uses, uses_count, is_active')
           .eq('code', (couponCode as string).toUpperCase().trim())
           .single()

         if (coupon && coupon.is_active && (coupon.max_uses === null || coupon.uses_count < coupon.max_uses)) {
           validatedCouponCode = (couponCode as string).toUpperCase().trim()
           if (coupon.discount_type === 'percent') {
             discountAmount = Math.round(PRECIO * coupon.discount_value / 100)
           } else if (coupon.discount_type === 'fixed') {
             discountAmount = Math.min(coupon.discount_value, PRECIO)
           }
           finalPrice = Math.max(PRECIO - discountAmount, 1) // mínimo $1 para MP

           // Incrementar uses_count
           await supabaseAdmin
             .from('coupons')
             .update({ uses_count: coupon.uses_count + 1 })
             .eq('id', coupon.id)
         }
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
           amount_ars: finalPrice,
           discount_amount_ars: discountAmount,
           coupon_code: validatedCouponCode,
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
               unit_price: finalPrice,                                                                                                                  
             },                                                                                                                                     
           ],                                                                                                                                       
           back_urls: {                                                                                                                             
             success: (() => {
               const url = new URL(`${APP_URL}/descarga`)
               url.searchParams.set('token', payment.download_token)
               if (utmParams && typeof utmParams === 'object') {
                 for (const [k, v] of Object.entries(utmParams)) {
                   if (typeof v === 'string' && k.startsWith('utm_')) url.searchParams.set(k, v)
                 }
               }
               return url.toString()
             })(),
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
