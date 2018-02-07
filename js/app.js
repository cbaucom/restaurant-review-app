if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(function(reg) {
    // If there is no controller, this page wans't loaded via a service worker, so they are looking at the latest version.
    // Exit early
    if(!navigator.serviceWorker.controller) {
      return;
    }

    // If there's an updated worker already waiting, call indexController._updateReady()
    if (reg.waiting) {
      console.log("Update Ready to SW!");
      return;
    }

    // If there's an updated worker installing, track its progress. If it becomes "installed", call indexController._updateReady()
    if (reg.installing) {
      addEventListener('statechange', function() {
        if (worker.state == 'installed') {
          console.log("Update Ready to SW!");
        }
      });
      return;        
    }

    // otherwise, listen for new installing workers arriving.
    // If one arrives, track its progress. 
    // If it becomes "installed", call 
    // indexController._updateReady()
    reg.addEventListener('updatefound', function() {
      addEventListener('statechange', function() {
        if (worker.state == 'installed') {
          console.log("Update Ready to SW!");
        }
      });
    });

    console.log('Service worker registered: ', reg);
  })
  .catch(function(error) {
    console.log('Service worker registration failed: ', error);
  });

  navigator.serviceWorker.ready.then(function(registeration) {
    console.log('Service Worker Ready');
  });
}