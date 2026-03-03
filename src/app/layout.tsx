  // src/app/layout.tsx                                                                                                                                                                 
   import type { Metadata } from 'next'                                                                                                                                                  
   import Script from 'next/script'  // ← Agregar esta línea                                                                                                                             
   import '../styles/globals.css'                                                                                                                                                        
                                                                                                                                                                                         
   export const metadata: Metadata = {                                                                                                                                                   
     title: 'Generador de Música para Marcas',                                                                                                                                           
     description: 'Creá el jingle de tu marca con IA. Escuchás gratis, solo pagás si la querés descargar.',                                                                              
     openGraph: {                                                                                                                                                                        
       title: 'Generador de Música para Marcas',                                                                                                                                         
       description: 'Jingles personalizados para tu negocio en minutos.',                                                                                                                
       locale: 'es_AR',                                                                                                                                                                  
     },                                                                                                                                                                                  
   }                                                                                                                                                                                     
                                                                                                                                                                                         
   export default function RootLayout({ children }: { children: React.ReactNode }) {                                                                                                     
     return (                                                                                                                                                                            
       <html lang="es">                                                                                                                                                                  
         <head>                                                                                                                                                                          
           {/* Google Analytics */}                                                                                                                                                      
           <Script                                                                                                                                                                       
             src="https://www.googletagmanager.com/gtag/js?id=G-RGN3X2NSZR"                                                                                                              
             strategy="afterInteractive"                                                                                                                                                 
           />                                                                                                                                                                            
           <Script                                                                                                                                                                       
             id="google-analytics"                                                                                                                                                       
             strategy="afterInteractive"                                                                                                                                                 
             dangerouslySetInnerHTML={{                                                                                                                                                  
               __html: `                                                                                                                                                                 
                 window.dataLayer = window.dataLayer || [];                                                                                                                              
                 function gtag(){dataLayer.push(arguments) ;}                                                                                                                            
                 gtag('js', new Date());                                                                                                                                                 
                 gtag('config', 'G-RGN3X2NSZR');                                                                                                                                         
               `,                                                                                                                                                                        
             }}                                                                                                                                                                          
           />                                                                                                                                                                            
         </head>                                                                                                                                                                         
         <body>                                                                                                                                                                          
           <div className="page-wrap">                                                                                                                                                   
             {children}                                                                                                                                                                  
           </div>                                                                                                                                                                        
         </body>                                                                                                                                                                         
       </html>                                                                                                                                                                           
     )                                                                                                                                                                                   
   }  
