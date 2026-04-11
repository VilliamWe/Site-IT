export function initBurger() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.header__nav');
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.header__nav .nav__link');
  const mobileBreakpoint = 992;

  if (!burger || !nav || !header) {
    return;
  }

  const scrollToTarget = (hash) => {
    const target = document.querySelector(hash);

    if (!target) {
      return;
    }

    const headerOffset = header.getBoundingClientRect().height + 16;
    const targetTop = window.scrollY + target.getBoundingClientRect().top - headerOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
  };

  const toggleMenu = (isOpen) => {
    burger.classList.toggle('burger--active', isOpen);
    nav.classList.toggle('header__nav--open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  };

  burger.addEventListener('click', () => {
    const isOpen = !burger.classList.contains('burger--active');
    toggleMenu(isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');

      if (!hash || !hash.startsWith('#')) {
        return;
      }

      event.preventDefault();

      if (window.innerWidth <= mobileBreakpoint) {
        toggleMenu(false);

        window.setTimeout(() => {
          scrollToTarget(hash);
        }, 10);

        return;
      }

      scrollToTarget(hash);
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint) {
      toggleMenu(false);
    }
  });
}
