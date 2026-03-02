 export const dynamic = 'force-dynamic'                                                                                                           
                                                                                                                                                    
   import { NextRequest, NextResponse } from 'next/server'                                                                                          
   import { supabaseAdmin } from '@/lib/supabase'                                                                                                   
                                                                                                                                                    
   export async function POST(req: NextRequest) {                                                                                                   
     console.log('[WEBHOOK v7] 📨 Received')                                                                                                        
                                                                                                                                                    
     try {                                                                                                                                          
       const urlString = req.url                                                                                                                    
       const match = urlString.match(/generationId=([^&]+)/)                                                                                        
       const generationId = match ? match[1] : null                                                                                                 
                                                                                                                                                    
       console.log('[WEBHOOK v7] generationId:', generationId)                                                                                      
                                                                                                                                                    
       if (!generationId) {                                                                                                                         
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       const body = await req.json()                                                                                                                
       const callbackType = body.data?.callbackType                                                                                                 
       const songs = body.data?.data || []                                                                                                          
                                                                                                                                                    
       if (callbackType === 'text') {                                                                                                               
         console.log('[WEBHOOK v7] TEXT - skipping')                                                                                                
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       if (callbackType === 'complete' && songs.length >= 2) {                                                                                      
         const songA = songs[0]                                                                                                                     
         const songB = songs[1]                                                                                                                     
                                                                                                                                                    
         // Verificar que existe                                                                                                                    
         const { data: existing, error: readError } = await supabaseAdmin                                                                           
           .from('generations')                                                                                                                     
           .select('id, suno_status')                                                                                                               
           .eq('id', generationId)                                                                                                                  
           .single()                                                                                                                                
                                                                                                                                                    
         console.log('[WEBHOOK v7] Existing:', existing?.id, existing?.suno_status)                                                                 
         console.log('[WEBHOOK v7] Read error:', readError?.message)                                                                                
                                                                                                                                                    
         if (!existing) {                                                                                                                           
           console.error('[WEBHOOK v7] ❌ Not found in DB')                                                                                         
           return NextResponse.json({ ok: true })                                                                                                   
         }                                                                                                                                          
                                                                                                                                                    
         // Actualizar                                                                                                                              
         const { data, error } = await supabaseAdmin                                                                                                
           .from('generations')                                                                                                                     
           .update({                                                                                                                                
             suno_status: 'complete',                                                                                                               
             song_a_id: songA.id,                                                                                                                   
             song_a_stream_url: songA.stream_audio_url,                                                                                             
             song_a_audio_url: songA.audio_url,                                                                                                     
             song_a_image_url: songA.image_url,                                                                                                     
             song_a_lyrics: songA.prompt,                                                                                                           
             song_b_id: songB.id,                                                                                                                   
             song_b_stream_url: songB.stream_audio_url,                                                                                             
             song_b_audio_url: songB.audio_url,                                                                                                     
             song_b_image_url: songB.image_url,                                                                                                     
             song_b_lyrics: songB.prompt,                                                                                                           
           })                                                                                                                                       
           .eq('id', generationId)                                                                                                                  
           .select()                                                                                                                                
                                                                                                                                                    
         console.log('[WEBHOOK v7] Rows updated:', data?.length)                                                                                    
         console.log('[WEBHOOK v7] Update error:', error?.message)                                                                                  
                                                                                                                                                    
         if (error) {                                                                                                                               
           console.error('[WEBHOOK v7] ❌ ERROR:', error.message)                                                                                   
           return NextResponse.json({ ok: true })                                                                                                   
         }                                                                                                                                          
                                                                                                                                                    
         if (!data || data.length === 0) {                                                                                                          
           console.error('[WEBHOOK v7] ❌ No rows updated')                                                                                         
           return NextResponse.json({ ok: true })                                                                                                   
         }                                                                                                                                          
                                                                                                                                                    
         console.log('[WEBHOOK v7] ✅ SUCCESS')                                                                                                     
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       return NextResponse.json({ ok: true })                                                                                                       
                                                                                                                                                    
     } catch (err: any) {                                                                                                                           
       console.error('[WEBHOOK v7] ❌ EXCEPTION:', err.message)                                                                                     
       return NextResponse.json({ ok: true })                                                                                                       
     }                                                                                                                                              
   }                                       
