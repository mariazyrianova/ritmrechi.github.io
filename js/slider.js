function initPriceSlider() {
  const priceSlider = new Swiper('.price-slider', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      centeredSlides: true,
      loop: false,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      breakpoints: {
          320: {
              slidesPerView: 1,
              spaceBetween: 10,
              centeredSlides: true
          },
          500: {
              slidesPerView: 2,
              spaceBetween: 16,
              centeredSlides: false
          },
          900: {
              slidesPerView: 3,
              spaceBetween: 20,
              centeredSlides: false
          },
          1200: {
              slidesPerView: 3,
              spaceBetween: 20,
              centeredSlides: false
          }
      }
  });
}

function initHelpSlider() {
    const helpSlider = new Swiper('.help-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: false, // Отключить центрирование, если не нужно
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            500: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            700: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1500: {
                slidesPerView: 4,
                spaceBetween: 20,
            }
        }
    });
}


function initReviewSlider() {
    const helpSlider = new Swiper('.review-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: false, // Отключить центрирование, если не нужно
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            500: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            700: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            900: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1500: {
                slidesPerView: 2,
                spaceBetween: 20,
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
  initPriceSlider();
  initHelpSlider();
  initReviewSlider();
});