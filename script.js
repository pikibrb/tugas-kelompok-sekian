// ---------------------------------------------------------------------------
// Theme Toggle Logic
// ---------------------------------------------------------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// BUG FIX: the original code assumed #theme-toggle always exists and called
// addEventListener on it directly. Since the button was missing from the
// markup, this threw a TypeError ("Cannot read properties of null") which
// stopped the *entire* inline script from executing — meaning the
// back-to-top button AND the card blur-to-clear reveal listeners below were
// never registered either. Guarding with a null-check (and adding the button
// back into the markup) prevents one missing element from silently breaking
// unrelated features.
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            htmlElement.classList.add('light');
        } else {
            htmlElement.classList.remove('light');
            htmlElement.classList.add('dark');
        }
    });
}

// ---------------------------------------------------------------------------
// Mobile Nav Menu Logic
// ---------------------------------------------------------------------------
// BUG FIX: on mobile, the entire nav-links row (including the theme
// toggle) was wrapped in `hidden md:flex`, so below the `md` breakpoint it
// just disappeared with no way to reach it. The theme toggle now lives
// outside that wrapper in the markup (always visible); this hamburger
// button reveals a slide-down panel with the nav links on small screens.
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuIcon = document.getElementById('mobile-menu-icon');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('flex');

        mobileMenu.classList.toggle('hidden', isOpen);
        mobileMenu.classList.toggle('flex', !isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', String(!isOpen));

        if (mobileMenuIcon) {
            mobileMenuIcon.textContent = isOpen ? 'menu' : 'close';
        }
    });

    // Close the mobile menu whenever a link inside it is tapped, and when
    // the viewport is resized up to desktop width (so it can't get stuck
    // open behind the always-visible desktop links).
    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
        });
    });

    const desktopBreakpoint = window.matchMedia('(min-width: 768px)');
    desktopBreakpoint.addEventListener('change', (e) => {
        if (e.matches) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
        }
    });
}

// ---------------------------------------------------------------------------
// Back to Top Logic
// ---------------------------------------------------------------------------
const backToTopBtn = document.getElementById('backToTopBtn');

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ---------------------------------------------------------------------------
// Blur to Clear ("card reveal") Interaction
// ---------------------------------------------------------------------------
const profileCards = document.querySelectorAll('.profile-card');

// BUG FIX: previously cards only cleared on `mouseenter`, so on touch
// devices (phones/tablets) — where "hover" never fires — cards stayed
// permanently blurred and were effectively unreadable. We now reveal a
// card as soon as it scrolls into view via IntersectionObserver, while
// still keeping the hover reveal as a nice extra on devices that support it.
const revealCard = (card) => card.classList.add('cleared');

if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                revealCard(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    profileCards.forEach((card) => cardObserver.observe(card));
} else {
    // Fallback for very old browsers without IntersectionObserver support.
    profileCards.forEach((card) => revealCard(card));
}

profileCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        revealCard(card);
    }, { once: true });
});

// ---------------------------------------------------------------------------
// Accessibility fix: images used `data-alt` instead of `alt`, so screen
// readers never received any description of the profile photos. Copy the
// description over to the real `alt` attribute on load.
// ---------------------------------------------------------------------------
document.querySelectorAll('img[data-alt]').forEach((img) => {
    if (!img.getAttribute('alt')) {
        img.setAttribute('alt', img.getAttribute('data-alt'));
    }
});

// ---------------------------------------------------------------------------
// Scroll Handling (parallax + back-to-top button)
// ---------------------------------------------------------------------------
// BUG FIX: choppy/janky scrolling ("scrolling patah-patah"). The previous
// code registered TWO separate non-passive `scroll` listeners (one for the
// back-to-top button, one for parallax) that each ran synchronously on
// every single scroll event — scroll events can fire far more often than
// the screen can repaint, and each listener wrote `style.transform`
// straight to the DOM outside of the browser's paint cycle. On heavily
// blurred elements (blur-3xl blobs) that repeated, unbatched work is what
// causes the stutter.
//
// The fix:
//   1. Merge both listeners into a single scroll handler.
//   2. Throttle the actual DOM writes to once per animation frame using
//      requestAnimationFrame, so we never do more work than the browser
//      can actually paint.
//   3. Mark the listener as passive so the browser doesn't have to wait
//      to see if we'll call preventDefault() before it can scroll.
const parallaxBlobs = document.querySelectorAll('.organic-blob');
const parallaxContent = document.querySelectorAll('[data-parallax]');

let ticking = false;

function updateOnScroll() {
    const scrolled = window.scrollY;

    if (backToTopBtn) {
        if (scrolled > 400) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        } else {
            backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
    }

    parallaxBlobs.forEach((blob) => {
        const speed = blob.getAttribute('data-speed') || 0.05;
        blob.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });

    parallaxContent.forEach((content) => {
        const speed = content.getAttribute('data-speed') || 0.1;
        content.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}, { passive: true });