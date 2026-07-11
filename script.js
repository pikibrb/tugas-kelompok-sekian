
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});


const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

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

const backToTopBtn = document.getElementById('backToTopBtn');

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


const profileCards = document.querySelectorAll('.profile-card');

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
   
    profileCards.forEach((card) => revealCard(card));
}

profileCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        revealCard(card);
    }, { once: true });
});

document.querySelectorAll('img[data-alt]').forEach((img) => {
    if (!img.getAttribute('alt')) {
        img.setAttribute('alt', img.getAttribute('data-alt'));
    }
});

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