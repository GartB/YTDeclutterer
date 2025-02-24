(function() {
    'use strict';

    const classesToHide = [
        '.annotation.annotation-type-custom.iv-branding', // Old branding annotations
        '.ytp-ce-covering-overlay', // Overlay that covers the player
        '.ytp-ce-expanding-image', // Expanding image elements
        '.ytp-ce-element' // All endcard elements (replaces the specific ones)
    ];

    function hideElements() {
        classesToHide.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => element.style.display = 'none');
        });
    }

    // Hide elements when the script runs
    hideElements();

    // Hide elements when the page is updated or refreshed
    const observer = new MutationObserver(hideElements);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();