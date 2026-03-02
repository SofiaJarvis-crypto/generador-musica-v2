export const dynamic = 'force-dynamic'                                                                                                           
                                                                                                                                                    
   import { NextRequest, NextResponse } from 'next/server'                                                                                          
   import { supabaseAdmin } from '@/lib/supabase'                                                                                                   
                                                                                                                                                    
   export async function POST(req: NextRequest) {                                                                                                   
     console.log('[WEBHOOK v4] 📨 Received')                                                                                                        
     console.log('[WEBHOOK v4] URL:', req.url)                                                                                                      
                                                                                                                                                    
     try {                                                                                                                                          
       let generationId = req.nextUrl.searchParams.get('ge nerationId')                                                                             
       console.log('[WEBHOOK v4] generationId from query:', generationId)                                                                           
                                                                                                                                                    
       const body = await req.json()                                                                                                                
                                                                                                                                                    
       if (!generationId) {                                                                                                                         
         generationId = body.generationId || body.generation_id                                                                                     
         console.log('[WEBHOOK v4] generationId from body:', generationId)                                                                          
       }                                                                                                                                            
                                                                                                                                                    
       if (!generationId) {                                                                                                                         
         console.error('[WEBHOOK v4] ❌ No generationId found')                                                                                     
         console.log('[WEBHOOK v4] Full body:', JSON.stringify(body))                                                                               
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       const callbackType = body.data?.callbackType                                                                                                 
       const songs = body.data?.data || []                                                                                                          
                                                                                                                                                    
       console.log('[WEBHOOK v4] callbackType:', callbackType, '| songs:', songs.length)                                                            
                                                                                                                                                    
       if (callbackType === 'text') {                                                                                                               
         console.log('[WEBHOOK v4] TEXT - skipping')                                                                                                
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       if (callbackType === 'complete' && songs.length >= 2) {                                                                                      
         const songA = songs[0]                                                                                                                     
         const songB = songs[1]                                                                                                                     
                                                                                                                                                    
         console.log('[WEBHOOK v4] COMPLETE - Updating generationId:', generationId)                                                                
                                                                                                                                                    
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
           console.error('[WEBHOOK v4] ❌ ERROR:', error.message, error.code)                                                                       
           return NextResponse.json({ ok: true })                                                                                                   
         }                                                                                                                                          
                                                                                                                                                    
         console.log('[WEBHOOK v4] ✅ SUCCESS - rows:', data?.length)                                                                               
         return NextResponse.json({ ok: true })                                                                                                     
       }                                                                                                                                            
                                                                                                                                                    
       return NextResponse.json({ ok: true })                                                                                                       
                                                                                                                                                    
     } catch (err: any) {                                                                                                                           
       console.error('[WEBHOOK v4] ❌ EXCEPTION:', err.message)                                                                                     
       return NextResponse.json({ ok: true })                                                                                                       
     }                                                                                                                                              
   }   
