import '../scss/style.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { initBurger } from './modules/burger.js';
import { initUi } from './modules/ui.js';
import { initSlider } from './modules/slider.js';

document.addEventListener('DOMContentLoaded', () => {
  initBurger();
  initUi();
  initSlider();
});
