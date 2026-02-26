(function () {
    function disableFeatures(el) {
        el.setAttribute("autocomplete", "off");
        el.setAttribute("autocorrect", "off");
        el.setAttribute("autocapitalize", "off");
        el.setAttribute("spellcheck", "false");
        el.spellcheck = false;
    }

    function applyAll() {
        document.querySelectorAll("input, textarea").forEach(disableFeatures);
    }

    document.addEventListener("DOMContentLoaded", applyAll);

    new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === 1) {
                    if (node.matches && node.matches("input, textarea")) {
                        disableFeatures(node);
                    }
                    if (node.querySelectorAll) {
                        node.querySelectorAll("input, textarea").forEach(disableFeatures);
                    }
                }
            });
        });
    }).observe(document.documentElement, { childList: true, subtree: true });
})();