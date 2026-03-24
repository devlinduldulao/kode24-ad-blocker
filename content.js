// Configuration
const DEBUG = false; // Set to true for development logging
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
    '.main-footer',
    'a[itemprop="url"]'
];

// Pre-compute combined selector for efficiency
const COMBINED_SELECTOR = AD_SELECTORS.join(', ');

/**
 * Logs message only when DEBUG is enabled
 * @param  {...any} args 
 */
function log(...args) {
    if (DEBUG) console.log('[Kode24 Ad Blocker]', ...args);
}

/**
 * Removes a specific element if it matches ad selectors.
 * @param {Element} element 
 */
function checkAndRemove(element) {
    // Check if the element itself matches
    if (element.matches?.(COMBINED_SELECTOR)) {
        log('Removing ad element:', element);
        element.remove();
        return; // Element removed, no need to check children
    }

    // Check children of the element
    const children = element.querySelectorAll?.(COMBINED_SELECTOR);
    if (children?.length) {
        children.forEach(child => {
            log('Removing child ad element:', child);
            child.remove();
        });
    }
}

/**
 * Initial cleanup of the document
 */
function initialCleanup() {
    const ads = document.querySelectorAll(COMBINED_SELECTOR);
    log(`Initial scan found ${ads.length} ads.`);
    ads.forEach((ad) => {
        ad.remove();
    });
}

/**
 * Initialize the ad blocker
 */
function init() {
    // Ensure document.body exists
    if (!document.body) {
        log('document.body not ready, waiting...');
        document.addEventListener('DOMContentLoaded', init, { once: true });
        return;
    }

    // Run initial cleanup
    initialCleanup();

    // MutationObserver to handle dynamic content efficiently
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        checkAndRemove(node);
                    }
                }
            }
        }
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Cleanup observer when page unloads to prevent memory leaks
    window.addEventListener('unload', () => observer.disconnect(), { once: true });

    log('High-performance observer active.');
}

// Run immediately
init();
