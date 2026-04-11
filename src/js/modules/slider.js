import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export function initSlider() {
  const slider = document.querySelector('.courses__slider');

  if (!slider) {
    return;
  }

  new Swiper(slider, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 800,
    pagination: {
      el: '.courses__pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.courses__button--next',
      prevEl: '.courses__button--prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}
