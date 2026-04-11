import Swiper from 'swiper';

export function initSlider() {
  const slider = document.querySelector('.courses__slider');
  const dots = document.querySelectorAll('.courses__dot');
  const slides = slider?.querySelectorAll('.swiper-slide');
  const placeholderLinks = document.querySelectorAll('.courses a[href="#"]');

  if (!slider) {
    return;
  }

  placeholderLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });

  const setActiveDesktopSlide = (activeIndex) => {
    const stackOrder = [activeIndex];

    for (let offset = 1; offset < slides.length; offset += 1) {
      const leftIndex = activeIndex - offset;
      const rightIndex = activeIndex + offset;

      if (leftIndex >= 0) {
        stackOrder.push(leftIndex);
      }

      if (rightIndex < slides.length) {
        stackOrder.push(rightIndex);
      }
    }

    stackOrder.forEach((slideIndex, orderIndex) => {
      slides[slideIndex].style.zIndex = String(slides.length - orderIndex);
    });

    slides?.forEach((slide, index) => {
      slide.classList.remove(
        'courses__slide--active',
        'courses__slide--before',
        'courses__slide--after',
        'courses__slide--far'
      );

      if (index === activeIndex) {
        slide.classList.add('courses__slide--active');
      } else if (index < activeIndex) {
        slide.classList.add('courses__slide--before');
      } else if (index === activeIndex + 1) {
        slide.classList.add('courses__slide--after');
      } else {
        slide.classList.add('courses__slide--far');
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.remove('courses__dot--active', 'courses__dot--medium', 'courses__dot--small');
      dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');

      const distance = Math.abs(index - activeIndex);

      if (distance === 0) {
        dot.classList.add('courses__dot--active');
      } else if (distance === 1) {
        dot.classList.add('courses__dot--medium');
      } else {
        dot.classList.add('courses__dot--small');
      }
    });
  };

  if (window.innerWidth > 1440) {
    dots.forEach((dot, index) => {
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);

      const activate = () => setActiveDesktopSlide(index);

      dot.addEventListener('click', activate);
      dot.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          activate();
        }
      });
    });

    slides?.forEach((slide, index) => {
      slide.style.cursor = 'pointer';
      slide.removeAttribute('tabindex');
      slide.removeAttribute('role');
      slide.addEventListener('pointerdown', (event) => {
        event.preventDefault();
      });
      slide.addEventListener('mousedown', (event) => {
        event.preventDefault();
      });
      slide.addEventListener('click', () => {
        setActiveDesktopSlide(index);
      });
    });

    setActiveDesktopSlide(0);
    return;
  }

  const swiper = new Swiper(slider, {
    slidesPerView: 'auto',
    grabCursor: true,
    watchOverflow: true,
    centeredSlides: false,
    slideToClickedSlide: true,
    spaceBetween: 20,
    speed: 800,
    breakpoints: {
      360: {
        spaceBetween: 31,
      },
      480: {
        spaceBetween: 16,
      },
      768: {
        spaceBetween: 18,
      },
      1100: {
        spaceBetween: 20,
      },
      1440: {
        spaceBetween: 24,
      },
    },
  });

  const updateDots = () => {
    if (!dots.length) {
      return;
    }

    const activeIndex = Math.min(swiper.activeIndex, dots.length - 1);

    dots.forEach((dot, index) => {
      dot.classList.remove('courses__dot--active', 'courses__dot--medium', 'courses__dot--small');
      dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');

      const distance = Math.abs(index - activeIndex);

      if (distance === 0) {
        dot.classList.add('courses__dot--active');
      } else if (distance === 1) {
        dot.classList.add('courses__dot--medium');
      } else {
        dot.classList.add('courses__dot--small');
      }
    });
  };

  dots.forEach((dot, index) => {
    dot.setAttribute('role', 'button');
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('aria-label', `Go to slide ${Math.min(index + 1, swiper.slides.length)}`);

    const goToSlide = () => {
      const targetIndex = Math.min(index, swiper.slides.length - 1);
      swiper.slideTo(targetIndex);
    };

    dot.addEventListener('click', goToSlide);
    dot.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        goToSlide();
      }
    });
  });

  slides?.forEach((slide, index) => {
    slide.style.cursor = 'pointer';
    slide.addEventListener('click', () => {
      swiper.slideTo(index);
    });
  });

  updateDots();
  swiper.on('slideChange', updateDots);
}
