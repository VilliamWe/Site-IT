export function initUi() {
  const body = document.body;
  const modal = document.querySelector('[data-modal="training"]');
  const openers = document.querySelectorAll('[data-modal-open="training"]');
  const closers = document.querySelectorAll('[data-modal-close]');
  const cookie = document.querySelector('[data-cookie-banner]');
  const cookieAccept = document.querySelector('[data-cookie-accept]');
  const cookieClose = document.querySelector('[data-cookie-close]');

  const setModalState = (isOpen) => {
    if (!modal) {
      return;
    }

    modal.classList.toggle('modal--open', isOpen);
    modal.setAttribute('aria-hidden', String(!isOpen));
    body.classList.toggle('modal-open', isOpen);
  };

  openers.forEach((button) => {
    button.addEventListener('click', () => {
      setModalState(true);
    });
  });

  closers.forEach((button) => {
    button.addEventListener('click', () => {
      setModalState(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setModalState(false);
    }
  });

  const hideCookie = () => {
    if (!cookie) {
      return;
    }

    cookie.classList.add('cookie--hidden');
  };

  cookieAccept?.addEventListener('click', hideCookie);
  cookieClose?.addEventListener('click', hideCookie);
}
