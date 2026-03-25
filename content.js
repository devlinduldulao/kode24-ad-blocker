// Configuration
const DEBUG = false; // Set to true for development logging
const LINK_SELECTOR = 'a[itemprop="url"]';
const SUBPAGE_CLASS = 'k24-subpage';

/**
 * Logs message only when DEBUG is enabled
 * @param  {...any} args 
 */
function log(...args) {
    if (DEBUG) {
        console.log('[Kode24 Ad Blocker]', ...args);
    }
}

/**
 * Returns true when the current page is not the site homepage.
 * @returns {boolean}
 */
function isSubpage() {
    return window.location.pathname !== '/';
}

/**
 * Adds a marker class so CSS can hide matching links on subpages.
 */
function markPageType() {
    if (isSubpage()) {
        document.documentElement.classList.add(SUBPAGE_CLASS);
    }
}

/**
 * Removes a specific element if it matches the targeted link selector.
 * @param {Element} element 
 */
function checkAndRemove(element) {
    if (element.matches?.(LINK_SELECTOR)) {
        log('Removing link element:', element);
        element.remove();
        return;
    }

    const children = element.querySelectorAll?.(LINK_SELECTOR);
    if (children?.length) {
        children.forEach(child => {
            log('Removing child link element:', child);
            child.remove();
        });
    }
}

/**
 * Initial cleanup of the document
 */
function initialCleanup() {
    const links = document.querySelectorAll(LINK_SELECTOR);
    log(`Initial scan found ${links.length} matching links.`);
    links.forEach(link => {
        link.remove();
    });
}

/**
 * Initialize the ad blocker
 */
function init() {
    markPageType();

    if (!isSubpage()) {
        log('Homepage detected, leaving links intact.');
        return;
    }

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

    log('Subpage link removal observer active.');
}

// Run immediately
init();
