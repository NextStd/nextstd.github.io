// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="introduction.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Getting Started</li><li class="chapter-item expanded "><a href="getting_started/prerequisites.html"><strong aria-hidden="true">1.</strong> Prerequisites</a></li><li class="chapter-item expanded "><a href="getting_started/installation.html"><strong aria-hidden="true">2.</strong> Installation &amp; Build</a></li><li class="chapter-item expanded "><a href="getting_started/quick_start.html"><strong aria-hidden="true">3.</strong> Quick Start Guide</a></li><li class="chapter-item expanded affix "><li class="part-title">Core Concepts (How it Works)</li><li class="chapter-item expanded "><a href="concepts/architecture.html"><strong aria-hidden="true">4.</strong> The Architecture</a></li><li class="chapter-item expanded "><a href="concepts/generic_macro.html"><strong aria-hidden="true">5.</strong> The _Generic Macro</a></li><li class="chapter-item expanded "><a href="concepts/rust_backend.html"><strong aria-hidden="true">6.</strong> Rust Backend &amp; FFI</a></li><li class="chapter-item expanded affix "><li class="part-title">API Reference</li><li class="chapter-item expanded "><a href="api/ns_print.html"><strong aria-hidden="true">7.</strong> ns_print()</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="api/types/integer.html"><strong aria-hidden="true">7.1.</strong> Printing Integers</a></li><li class="chapter-item expanded "><a href="api/types/float.html"><strong aria-hidden="true">7.2.</strong> Printing Floats &amp; Doubles</a></li><li class="chapter-item expanded "><a href="api/types/string.html"><strong aria-hidden="true">7.3.</strong> Printing Strings</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Examples</li><li class="chapter-item expanded "><a href="examples/01_integer.html"><strong aria-hidden="true">8.</strong> 01: Printing Integers</a></li><li class="chapter-item expanded "><a href="examples/02_float.html"><strong aria-hidden="true">9.</strong> 02: Floating Point Precision</a></li><li class="chapter-item expanded "><a href="examples/03_string.html"><strong aria-hidden="true">10.</strong> 03: Strings &amp; Null Safety</a></li><li class="chapter-item expanded affix "><li class="part-title">Project Info</li><li class="chapter-item expanded "><a href="roadmap.html"><strong aria-hidden="true">11.</strong> Roadmap</a></li><li class="chapter-item expanded "><a href="contributing.html"><strong aria-hidden="true">12.</strong> Contributing</a></li><li class="chapter-item expanded "><a href="license.html"><strong aria-hidden="true">13.</strong> License</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
