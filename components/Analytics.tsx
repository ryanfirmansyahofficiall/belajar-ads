'use client';

import Script from 'next/script';
import { useSettings } from '@/context/SettingsContext';

export function Analytics() {
  const settings = useSettings();
  const gaId = (settings.googleAnalyticsId || process.env.NEXT_PUBLIC_GA_ID || '').trim();
  const pixelId = (settings.metaPixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID || '').trim();

  const isValidGa = gaId && gaId.length > 3 && !gaId.startsWith('#');
  const isValidPixel = pixelId && pixelId.length > 3 && !pixelId.startsWith('#');

  return (
    <>
      {/* Google Analytics - only runs if valid GA_ID is provided in CMS settings */}
      {isValidGa && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel - only runs if valid META_PIXEL_ID is provided in CMS settings */}
      {isValidPixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

// Client-side tracking helper function
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // Google Analytics Event
  if ((window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, params);
  }

  // Meta Pixel Event
  if ((window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
    (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('trackCustom', eventName, params);
  }
}
