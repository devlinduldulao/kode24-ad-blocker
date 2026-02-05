// Configuration
const AD_SELECTORS = [
    '.commercial', 
    '.banner', 
    '.banner-container', 
    '#diamond-partners-list-tile',
    '.top-bar-ad',
    '#top-bar-ad',
    '.top-bar-ad-desktop',
    '.job-list',
    '#desktop-sidemenu-front',
    '.main-footer'
];

/**
 * Removes a specific element if it matches ad selectors.
 * @param {Element} element 
 */
function checkAndRemove(element) {
    // Check if the element itself matches
    if (element.matches && AD_SELECTORS.some(sel => element.matches(sel))) {
        // console.log('[Kode24 Ad Blocker] Removing ad element:', element);
        element.remove();
        return; // Element removed, no need to check children
    }

    // Check children of the element
    if (element.querySelectorAll) {
        const children = element.querySelectorAll(AD_SELECTORS.join(', '));
        children.forEach(child => {
            // console.log('[Kode24 Ad Blocker] Removing child ad element:', child);
            child.remove();
        });
    }
}

/**
 * Initial cleanup of the document
 */
function initialCleanup() {
    const selector = AD_SELECTORS.join(', ');
    const ads = document.querySelectorAll(selector);
    console.log(`[Kode24 Ad Blocker] Initial scan found ${ads.length} ads.`);
    ads.forEach(ad => ad.remove());
}

// Run immediately
initialCleanup();

// MutationObserver to handle dynamic content efficiently
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    checkAndRemove(node);
                }
            });
        }
    }
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});

console.log("[Kode24 Ad Blocker] High-performance observer active.");
