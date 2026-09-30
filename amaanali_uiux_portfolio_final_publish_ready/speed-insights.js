// Vercel Speed Insights - Static Site Implementation
// This initializes the Speed Insights queue and loads the tracking script

(function() {
  'use strict';
  
  // Initialize the queue for Speed Insights
  if (window.si) return;
  
  window.si = function() {
    (window.siq = window.siq || []).push(arguments);
  };
  
  // Create and inject the Speed Insights script
  var script = document.createElement('script');
  script.src = '/_vercel/speed-insights/script.js';
  script.defer = true;
  script.setAttribute('data-sdkn', '@vercel/speed-insights');
  script.setAttribute('data-sdkv', '1.3.1');
  
  // Append to head
  if (document.head) {
    document.head.appendChild(script);
  } else {
    // If called before head exists, wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
      document.head.appendChild(script);
    });
  }
})();
