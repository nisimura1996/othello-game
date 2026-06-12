document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.atmosphere__gallery', {
        loop: true,
        speed: 10000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        slidesPerView: 2,
        spaceBetween: 24,
        breakpoints: {
            768: {
                slidesPerView: 3.5,
            }
        }
    });
});
