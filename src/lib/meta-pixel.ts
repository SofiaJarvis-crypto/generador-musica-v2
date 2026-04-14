// src/lib/meta-pixel.ts
// Meta Pixel helper functions

export const FB_PIXEL_ID = '956333963474211';

declare global {
  interface Window {
    fbq?: (
      action: string,
      eventName: string,
      data?: Record<string, any>,
      options?: { eventID?: string }
    ) => void;
  }
}

// Track PageView (automático en layout)
export const trackPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track ViewContent (homepage carga)
export const trackViewContent = (contentName?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName || 'Homepage',
      content_type: 'product',
    });
  }
};

// Track Lead (form completado)
export const trackLead = (data?: { brand_name?: string }) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', data);
  }
};

// Track custom event: GenerationStarted
export const trackGenerationStarted = (generationId: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'GenerationStarted', {
      generation_id: generationId,
      content_type: 'music_generation',
    });
  }
};

// Track AddToCart (canción lista para escuchar)
export const trackAddToCart = (data: {
  generationId: string;
  brandName?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [data.generationId],
      content_type: 'product',
      content_name: data.brandName || 'Music Generation',
      value: data.value || 8900,
      currency: 'ARS',
    });
  }
};

// Track InitiateCheckout (click en botón pagar)
export const trackInitiateCheckout = (data: {
  generationId: string;
  brandName?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: [data.generationId],
      content_type: 'product',
      content_name: data.brandName || 'Music Generation',
      value: data.value || 8900,
      currency: 'ARS',
      num_items: 1,
    });
  }
};

// Track Purchase (pago completado)
// eventId debe coincidir con el event_id enviado por CAPI en el webhook para que Meta desduplique
export const trackPurchase = (data: {
  generationId: string;
  brandName?: string;
  value: number;
  transactionId?: string;
  eventId?: string;
}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(
      'track',
      'Purchase',
      {
        content_ids: [data.generationId],
        content_type: 'product',
        content_name: data.brandName || 'Music Generation',
        value: data.value,
        currency: 'ARS',
        transaction_id: data.transactionId,
      },
      data.eventId ? { eventID: data.eventId } : undefined
    );
  }
};
