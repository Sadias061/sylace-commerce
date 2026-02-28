/* ==========================================
   SYLACE SHOPPING - Main Script
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- AOS (Animate On Scroll) Init ---- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      delay: 0,
    });
  }

  /* ---- Navbar Scroll Effect ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ---- Product Detail Gallery ---- */
  const mainImg = document.getElementById('mainImg');
  const smallImgs = document.getElementsByClassName('small-img');
  const smallImgCols = document.getElementsByClassName('small-img-col');

  if (mainImg && smallImgs.length > 0) {
    for (let i = 0; i < smallImgs.length; i++) {
      smallImgs[i].addEventListener('click', function () {
        mainImg.src = this.src;
        mainImg.alt = this.alt;

        // Update active state on thumbnails
        for (let j = 0; j < smallImgCols.length; j++) {
          smallImgCols[j].classList.remove('active');
        }
        if (this.parentElement) {
          this.parentElement.classList.add('active');
        }
      });
    }
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  /* ---- Close Mobile Nav on Link Click ---- */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarSupportedContent');
  if (navbarCollapse) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

});
