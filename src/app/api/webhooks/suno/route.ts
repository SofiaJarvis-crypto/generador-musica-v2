 export const dynamic = 'force-dynamic'                                                                                                           
                                                                                                                                                    
   import { NextRequest, NextResponse } from 'next/server'                                                                                          
   import { supabaseAdmin } from '@/lib/supabase'                                                                                                   
                                                                                                                                                    
   export async function POST(req: NextRequest) {                                                                                                   
     console.log('[WEBHOOK v6] 📨 Received')                                                                                                        
                                                                                                                                                    
     try {                                                                                                                                          
       // Parsear generationId directamente con regex                                                                                               
       const urlString = req.url                                                                                                                    
       const match = urlString.match(/generationId=([^&]+)/)                                                                                        
       const generationId = match ? match[1] : null                                                                                                 
                                                                                                                                                    
       console.log('[WEBHOOK v6] generationId:', generationId)                                                                                      
                                                                                                                                                    
       if (!generationId) {                                                                                                                         
         console.error('[WEBHOOK v6] ❌ No generationId')                                                                                           
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       const body = await req.json()                                                                                                                
       const callbackType = body.data?.callbackType                                                                                                 
       const songs = body.data?.data || []                                                                                                          
                                                                                                                                                    
       console.log('[WEBHOOK v6] callbackType:', callbackType)                                                                                      
                                                                                                                                                    
       if (callbackType === 'text') {                                                                                                               
         console.log('[WEBHOOK v6] TEXT - skipping')                                                                                                
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       if (callbackType === 'complete' && songs.length >= 2) {                                                                                      
         const songA = songs[0]                                                                                                                     
         const songB = songs[1]                                                                                                                     
                                                                                                                                                    
         console.log('[WEBHOOK v6] COMPLETE - Updating:', generationId)                                                                             
                                                                                                                                                    
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
                                                                                                                                                    
         if (error) {                                                                                                                               
           console.error('[WEBHOOK v6] ❌ ERROR:', error.message)                                                                                   
           return NextResponse.json({ ok: true })                                                                                                   
         }                                                                                                                                          
                                                                                                                                                    
         console.log('[WEBHOOK v6] ✅ SUCCESS')                                                                                                     
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       return NextResponse.json({ ok: true })                                                                                                       
                                                                                                                                                    
     } catch (err: any) {                                                                                                                           
       console.error('[WEBHOOK v6] ❌ EXCEPTION:', err.message)                                                                                     
       return NextResponse.json({ ok: true })                                                                                                       
     }                                                                                                                                              
   }                           
