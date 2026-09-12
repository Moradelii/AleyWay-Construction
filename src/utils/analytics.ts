export type AnalyticsEvent = 
  | 'hero_cta_click'
  | 'project_view'
  | 'gallery_open'
  | 'video_play'
  | 'video_complete'
  | 'pricing_view'
  | 'financing_view'
  | 'form_start'
  | 'form_step_complete'
  | 'form_submit'
  | 'phone_click'
  | 'email_click'
  | 'consultation_click';

export function trackEvent(eventName: AnalyticsEvent, payload?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    // Log to structured console or dispatch custom event for future analytics tag manager
    console.debug(`[AleyWay Analytics] Event: ${eventName}`, payload || {});
    window.dispatchEvent(new CustomEvent('aleyway:analytics', {
      detail: { event: eventName, payload, timestamp: Date.now() }
    }));
  }
}
