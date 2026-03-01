/* ============================================
   SYLACE COMMERCE - Modern Interactive Script
   ============================================ */

// ==========================================
// PAGE LOADER
// ==========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 600);
    }
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (navbar) {
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    lastScroll = currentScroll;
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.pageYOffset > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for child elements
            const delay = index * 100;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Also animate product cards individually
const productObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 80);
            productObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.product').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    productObserver.observe(el);
});

// Animate blog cards
document.querySelectorAll('.blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    productObserver.observe(el);
});

// ==========================================
// PRODUCT IMAGE GALLERY (Product Detail Page)
// ==========================================
let mainImg = document.getElementById("mainImg");
let smallImgs = document.getElementsByClassName("small-img");

if (mainImg && smallImgs.length > 0) {
    for (let i = 0; i < smallImgs.length; i++) {
        smallImgs[i].onclick = function () {
            // Remove active class from all
            document.querySelectorAll('.small-img-col').forEach(col => {
                col.classList.remove('active');
            });
            // Add active to clicked
            this.parentElement.classList.add('active');

            // Smooth image transition
            mainImg.style.opacity = '0';
            mainImg.style.transform = 'scale(0.95)';

            setTimeout(() => {
                mainImg.src = smallImgs[i].src;
                mainImg.style.opacity = '1';
                mainImg.style.transform = 'scale(1)';
            }, 200);
        };
    }

    // Add transition to main image
    mainImg.style.transition = 'all 0.3s ease';
}

// ==========================================
// SMOOTH HOVER EFFECTS FOR PRODUCT CARDS
// ==========================================
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function (e) {
        this.style.transform = 'translateY(0)';
    });
});

// ==========================================
// ACTIVE NAV LINK HIGHLIGHT
// ==========================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    } else if (href !== '#') {
        link.classList.remove('active');
    }
});

// ==========================================
// PARALLAX EFFECT FOR HERO SECTIONS
// ==========================================
const heroSection = document.getElementById('home');
const bannerSection = document.getElementById('banner');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    if (heroSection) {
        const heroContent = heroSection.querySelector('.container');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.002);
        }
    }

    if (bannerSection) {
        const bannerContent = bannerSection.querySelector('.container');
        if (bannerContent) {
            const bannerTop = bannerSection.offsetTop;
            const bannerScroll = scrolled - bannerTop + window.innerHeight;
            if (bannerScroll > 0) {
                bannerContent.style.transform = `translateY(${bannerScroll * 0.1}px)`;
            }
        }
    }
});

// ==========================================
// COUNTER ANIMATION FOR STATS (if any)
// ==========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// ==========================================
// FORM VALIDATION (Contact Page)
// ==========================================
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        let isValid = true;

        [name, email, subject, message].forEach(field => {
            if (field && !field.value.trim()) {
                field.style.borderColor = '#ef4444';
                field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
                isValid = false;
            } else if (field) {
                field.style.borderColor = '#10b981';
                field.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
            }
        });

        if (email && email.value && !email.value.includes('@')) {
            email.style.borderColor = '#ef4444';
            email.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
            isValid = false;
        }

        if (isValid) {
            const btn = this.querySelector('.form-submit-btn');
            if (btn) {
                btn.textContent = '✓ Message envoyé !';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

                setTimeout(() => {
                    btn.innerHTML = 'Envoyer le message <i class="fas fa-paper-plane ms-2"></i>';
                    btn.style.background = '';
                    this.reset();

                    [name, email, subject, message].forEach(field => {
                        if (field) {
                            field.style.borderColor = '';
                            field.style.boxShadow = '';
                        }
                    });
                }, 3000);
            }
        }
    });

    // Reset field styles on input
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(field => {
        field.addEventListener('input', function () {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
}

// ==========================================
// CURSOR GLOW EFFECT (subtle)
// ==========================================
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==========================================
// TYPING EFFECT FOR HERO (optional enhancement)
// ==========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

console.log('%c🛍️ Sylace Commerce - Modern E-Commerce', 'color: #ff6b35; font-size: 16px; font-weight: bold;');
console.log('%cDesigned with ❤️ by Sylace', 'color: #a1a1aa; font-size: 12px;');
