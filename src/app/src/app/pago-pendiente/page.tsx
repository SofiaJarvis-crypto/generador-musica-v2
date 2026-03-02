'use client'                                                                                                                                     
                                                                                                                                                    
   import { useRouter } from 'next/navigation'                                                                                                      
   import Nav from '@/components/Nav'                                                                                                               
                                                                                                                                                    
   export default function PagoPendientePage() {                                                                                                    
     const router = useRouter()                                                                                                                     
                                                                                                                                                    
     return (                                                                                                                                       
       <>                                                                                                                                           
         <Nav step={3} />                                                                                                                           
         <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>                                                            
           <div style={{ fontSize: '64px', marginBottom: '20px' }}>⏳</div>                                                                         
           <h1>Pago pendiente</h1>                                                                                                                  
           <p style={{ maxWidth: '500px', margin: '20px auto', opacity: 0.8 }}>                                                                     
             Tu pago esta siendo procesado. Esto puede tomar unos minutos.                                                                          
           </p>                                                                                                                                     
           <p style={{ maxWidth: '500px', margin: '20px auto', opacity: 0.8 }}>                                                                     
             Recibiras un email cuando se confirme el pago.                                                                                         
           </p>                                                                                                                                     
           <button                                                                                                                                  
             className="generate-btn"                                                                                                               
             onClick={() => router.push('/')}                                                                                                       
             style={{ marginTop: '30px' }}                                                                                                          
           >                                                                                                                                        
             Volver al inicio                                                                                                                       
           </button>                                                                                                                                
         </div>                                                                                                                                     
       </>                                                                                                                                          
     )                                                                                                                                              
   }       
