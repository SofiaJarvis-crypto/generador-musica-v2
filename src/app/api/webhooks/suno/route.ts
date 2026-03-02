export const dynamic = 'force-dynamic'                                                                                                           
                                                                                                                                                    
   import { NextRequest, NextResponse } from 'next/server'                                                                                          
   import { supabaseAdmin } from '@/lib/supabase'                                                                                                   
                                                                                                                                                    
   export async function POST(req: NextRequest) {                                                                                                   
     console.log('[WEBHOOK v3] 📨 Received')                                                                                                        
                                                                                                                                                    
     try {                                                                                                                                          
       const generationId = req.nextUrl.searchParams.get('ge nerationId')                                                                           
       console.log('[WEBHOOK v3] generationId:', generationId)                                                                                      
                                                                                                                                                    
       if (!generationId) {                                                                                                                         
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       const body = await req.json()                                                                                                                
       const callbackType = body.data?.callbackType                                                                                                 
       const songs = body.data?.data || []                                                                                                          
                                                                                                                                                    
       console.log('[WEBHOOK v3] callbackType:', callbackType, '| songs:', songs.length)                                                            
                                                                                                                                                    
       if (callbackType === 'text') {                                                                                                               
         console.log('[WEBHOOK v3] TEXT - skipping')                                                                                                
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       if (callbackType === 'complete' && songs.length >= 2) {                                                                                      
         const songA = songs[0]                                                                                                                     
         const songB = songs[1]                                                                                                                     
                                                                                                                                                    
         console.log('[WEBHOOK v3] COMPLETE - Song A:', songA.id)                                                                                   
         console.log('[WEBHOOK v3] COMPLETE - Song B:', songB.id)                                                                                   
         console.log('[WEBHOOK v3] COMPLETE - Updating DB...')                                                                                      
                                                                                                                                                    
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
           console.error('[WEBHOOK v3] ❌ ERROR:', error.message, error.code, error.details)                                                        
           return NextResponse.json({ ok: true })                                                                                                   
         }                                                                                                                                          
                                                                                                                                                    
         console.log('[WEBHOOK v3] ✅ SUCCESS - rows updated:', data?.length)                                                                       
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       console.log('[WEBHOOK v3] Unknown callbackType:', callbackType)                                                                              
       return NextResponse.json({ ok: true })                                                                                                       
                                                                                                                                                    
     } catch (err: any) {                                                                                                                           
       console.error('[WEBHOOK v3] ❌ EXCEPTION:', err.message)                                                                                     
       return NextResponse.json({ ok: true })                                                                                                       
     }                                                                                                                                              
   }                         
