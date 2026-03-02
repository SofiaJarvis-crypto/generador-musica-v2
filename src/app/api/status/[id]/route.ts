export const dynamic = 'force-dynamic'                                                                                                           
   export const revalidate = 0                                                                                                                      
                                                                                                                                                    
   import { NextRequest, NextResponse } from 'next/server'                                                                                          
   import { supabaseAdmin } from '@/lib/supabase'                                                                                                   
                                                                                                                                                    
   export async function GET(                                                                                                                       
     _req: NextRequest,                                                                                                                             
     { params }: { params: { id: string } }                                                                                                         
   ) {                                                                                                                                              
     try {                                                                                                                                          
       console.log('[Status API v2] Checking:', params.id)                                                                                          
                                                                                                                                                    
       const { data, error } = await supabaseAdmin                                                                                                  
         .from('generations')                                                                                                                       
         .select('*')                                                                                                                               
         .eq('id', params.id)                                                                                                                       
         .single()                                                                                                                                  
                                                                                                                                                    
       if (error || !data) {                                                                                                                        
         return NextResponse.json({ error: 'No encontrado' }, { status: 404 })                                                                      
       }                                                                                                                                            
                                                                                                                                                    
       console.log('[Status API v2] suno_status:', data.suno_status)                                                                                
                                                                                                                                                    
       const response = NextResponse.json({                                                                                                         
         id: data.id,                                                                                                                               
         suno_status: data.suno_status,                                                                                                             
         brand_name: data.brand_name,                                                                                                               
         genre: data.genre,                                                                                                                         
         duration_seconds: data.duration_seconds,                                                                                                   
         moods: data.moods,                                                                                                                         
         song_a_stream_url: data.song_a_stream_url,                                                                                                 
         song_a_image_url: data.song_a_image_url,                                                                                                   
         song_a_lyrics: data.song_a_lyrics,                                                                                                         
         song_b_stream_url: data.song_b_stream_url,                                                                                                 
         song_b_image_url: data.song_b_image_url,                                                                                                   
         song_b_lyrics: data.song_b_lyrics,                                                                                                         
         selected_song: data.selected_song,                                                                                                         
         regen_count: data.regen_count,                                                                                                             
         error_message: data.error_message,                                                                                                         
       })                                                                                                                                           
                                                                                                                                                    
       response.headers.set('Cache-Cont rol', 'no-store, no-cache, must-revalidate')                                                                
       return response                                                                                                                              
                                                                                                                                                    
     } catch (err) {                                                                                                                                
       console.error('[Status API v2] Error:', err)                                                                                                 
       return NextResponse.json({ error: 'Error interno' }, { status: 500 })                                                                        
     }                                                                                                                                              
   }                                   
