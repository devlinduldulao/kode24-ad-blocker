// Configuration
const DEBUG = false; // Set to true for development logging
const GLOBAL_SELECTORS = [
    'div.top-bar-ad-desktop',
    'div.display-desktop'
];
const SUBPAGE_SELECTORS = [
    'a[itemprop="url"]',
    'div.desktop-row.commercial.listing-carousel',
    'div.article-preview-text'
];
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
 * Adds a marker class so CSS can hide matching elements on subpages.
 */
function markPageType() {
    if (isSubpage()) {
        document.documentElement.classList.add(SUBPAGE_CLASS);
        return;
    }

    document.documentElement.classList.remove(SUBPAGE_CLASS);
}

/**
 * Returns the active selector list for the current page.
 * @returns {string}
 */
function getActiveSelector() {
    const selectors = isSubpage()
        ? [...GLOBAL_SELECTORS, ...SUBPAGE_SELECTORS]
        : GLOBAL_SELECTORS;

    return selectors.join(', ');
}

/**
 * Removes a specific element if it matches one of the targeted selectors.
 * @param {Element} element 
 * @param {string} selector
 */
function checkAndRemove(element, selector) {
    if (element.matches?.(selector)) {
        log('Removing targeted element:', element);
        element.remove();
        return;
    }

    const children = element.querySelectorAll?.(selector);
    if (children?.length) {
        children.forEach(child => {
            log('Removing child targeted element:', child);
            child.remove();
        });
    }
}

/**
 * Initial cleanup of the document
 * @param {string} selector
 */
function initialCleanup(selector) {
    const elements = document.querySelectorAll(selector);
    log(`Initial scan found ${elements.length} matching elements.`);
    elements.forEach(element => {
        element.remove();
    });
}

/**
 * Initialize the ad blocker
 */
function init() {
    markPageType();
    const activeSelector = getActiveSelector();

    // Ensure document.body exists
    if (!document.body) {
        log('document.body not ready, waiting...');
        document.addEventListener('DOMContentLoaded', init, { once: true });
        return;
    }

    // Run initial cleanup
    initialCleanup(activeSelector);

    // MutationObserver to handle dynamic content efficiently
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        checkAndRemove(node, activeSelector);
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

    log(isSubpage() ? 'Subpage cleanup observer active.' : 'Global cleanup observer active.');
}

// Run immediately
init();
