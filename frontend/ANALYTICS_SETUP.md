# Analytics & Tracking Setup Guide

## Google Analytics Setup

1. Create a Google Analytics 4 (GA4) property at https://analytics.google.com
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Add the following script to `index.html` in the `<head>` section:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## Google Search Console Setup

1. Go to https://search.google.com/search-console
2. Add your property (piedmontdetailers.com)
3. Verify ownership using one of the provided methods
4. Submit your sitemap (create a sitemap.xml file or use a sitemap generator)

## Conversion Tracking

### Form Submissions
Add event tracking to form submissions in:
- `src/pages/Contact.tsx` - contact form
- `src/pages/Booking.tsx` - booking form
- `src/components/EmailCapture.tsx` - email capture

Example event tracking code:
```javascript
gtag('event', 'form_submission', {
  'event_category': 'Contact',
  'event_label': 'Contact Form'
});
```

### Booking Completions
Add event tracking when bookings are confirmed in `src/pages/Booking.tsx`:
```javascript
gtag('event', 'purchase', {
  'transaction_id': bookingId,
  'value': estimatedPrice,
  'currency': 'USD',
  'items': [{
    'item_name': servicePackage,
    'item_category': 'Car Detailing'
  }]
});
```

## Next Steps

1. Replace placeholder Measurement ID with your actual GA4 ID
2. Set up conversion goals in Google Analytics
3. Configure Google Search Console
4. Test tracking events in development
5. Verify tracking is working in production
