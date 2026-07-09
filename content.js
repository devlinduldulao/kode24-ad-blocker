'use strict';

const DEBUG = false;
const SUBPAGE_CLASS = 'k24-subpage';

// Keep these selectors narrowly scoped to commercial containers. Broad article
// URL and preview selectors can also match normal editorial content.
const GLOBAL_SELECTORS = [
    '.top-bar-ad',
    '.top-bar-ad-desktop',
    '.display-desktop',
    '.desktop-row.commercial.listing-carousel'
];

const SUBPAGE_SELECTORS = [
    '.commercial.listing-carousel',
    '.banner-container',
    '.banner-listing'
];

const GLOBAL_SELECTOR = GLOBAL_SELECTORS.join(', ');
const SUBPAGE_SELECTOR = [...GLOBAL_SELECTORS, ...SUBPAGE_SELECTORS].join(', ');

function log(...args) {
    if (DEBUG) {
        console.debug('[Kode24 Ad Blocker]', ...args);
    }
}

function isSubpage() {
    return window.location.pathname !== '/';
}

function getActiveSelector() {
    return isSubpage() ? SUBPAGE_SELECTOR : GLOBAL_SELECTOR;
}

function syncPageType() {
    document.documentElement.classList.toggle(SUBPAGE_CLASS, isSubpage());
}

function removeMatches(root, selector = getActiveSelector()) {
    if (root.nodeType === Node.ELEMENT_NODE && root.matches(selector)) {
        root.remove();
        return;
    }

    root.querySelectorAll(selector).forEach((element) => element.remove());
}

function cleanupDocument() {
    const selector = getActiveSelector();
    const matches = document.querySelectorAll(selector);

    matches.forEach((element) => element.remove());
    log(`Removed ${matches.length} targeted element(s).`);
}

function observeDynamicContent() {
    const observer = new MutationObserver((mutations) => {
        syncPageType();
        const selector = getActiveSelector();

        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    removeMatches(node, selector);
                }
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}

function init() {
    syncPageType();
    cleanupDocument();
    observeDynamicContent();
    log('Cleanup observer active.');
}

init();
