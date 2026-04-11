export function initBurger() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.header__nav .nav__link');
  const mobileBreakpoint = 992;

  if (!burger || !nav) {
    return;
  }

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
    link.addEventListener('click', () => {
      if (window.innerWidth <= mobileBreakpoint) {
        toggleMenu(false);
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint) {
      toggleMenu(false);
    }
  });
}
