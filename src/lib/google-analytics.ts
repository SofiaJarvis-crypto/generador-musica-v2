// src/lib/google-analytics.ts
// Google Analytics 4 helper functions

export const GA_MEASUREMENT_ID = 'G-RGN3X2NSZR';

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

// Track PageView (handled automatically in layout)
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track ViewContent (homepage load)
export const trackViewContent = (contentName?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      items: [{
        item_id: 'music_generator',
        item_name: contentName || 'Music Generator Homepage',
        item_category: 'product',
      }]
    });
  }
};

// Track Lead (form completed)
export const trackLead = (data?: { brand_name?: string }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      brand_name: data?.brand_name,
      currency: 'ARS',
      value: 8900,
    });
  }
};

// Track custom event: GenerationStarted
export const trackGenerationStarted = (generationId: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generation_started', {
      generation_id: generationId,
      content_type: 'music_generation',
    });
  }
};

// Track AddToCart (song ready to listen)
export const trackAddToCart = (data: {
  generationId: string;
  brandName?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'ARS',
      value: data.value || 8900,
      items: [{
        item_id: data.generationId,
        item_name: data.brandName || 'Music Generation',
        item_category: 'music',
        price: data.value || 8900,
        quantity: 1,
      }]
    });
  }
};

// Track InitiateCheckout (click on pay button)
export const trackInitiateCheckout = (data: {
  generationId: string;
  brandName?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'ARS',
      value: data.value || 8900,
      items: [{
        item_id: data.generationId,
        item_name: data.brandName || 'Music Generation',
        item_category: 'music',
        price: data.value || 8900,
        quantity: 1,
      }]
    });
  }
};

// Track Purchase (payment completed)
export const trackPurchase = (data: {
  generationId: string;
  brandName?: string;
  value: number;
  transactionId?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: data.transactionId || data.generationId,
      currency: 'ARS',
      value: data.value,
      items: [{
        item_id: data.generationId,
        item_name: data.brandName || 'Music Generation',
        item_category: 'music',
        price: data.value,
        quantity: 1,
      }]
    });
  }
};

// Track Regeneration
export const trackRegeneration = (generationId: string, regenCount: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'regeneration', {
      generation_id: generationId,
      regen_count: regenCount,
    });
  }
};
