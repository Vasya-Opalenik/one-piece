const swiper = new Swiper('.swiper', {
    // Optional parameters
    // loop: true,
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 80,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // breakpoints: {
    //     // when window width is >= 640px
    //     768: {
    //         slidesPerView: 2,
    //         spaceBetween: 40,
    //         centeredSlides: false,
    //     },
    //     992: {
    //         slidesPerView: 3,
    //         spaceBetween: 60,
    //         centeredSlides: true,
    //     }
    // },
});