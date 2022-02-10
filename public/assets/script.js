// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
//   }

const intersectionSections = Array.from(document.getElementsByClassName('intersection-section'));
const options = {
    root: null,
    threshold: 0.5,
    // rootMargin: "-25px"
};

const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            const animateEls = $(entry.target).find('.animate');

            animateEls.each((i, el) => {
                if ($(el).attr('data-delay')) {
                    $(el).css('transition-delay', `${$(el).attr('data-delay')}`);
                }

                if ($(el).attr('data-width')) {
                    $(el).css('width', `${$(el).attr('data-width')}`);
                }

                $(el).addClass('activate');
                observer.unobserve(entry.target);
            });

        }

    });
}, options);

intersectionSections.forEach(section => {
    observer.observe(section);
});

$('input, textarea').focus((e) => {
    console.log($(e.target).siblings())
    $('#contact-form').find('.underline').removeClass('focused');
    $(e.target).siblings().addClass('focused')

});

const mobileNav = $('#navbar aside');
const burgerBtn = $('#burger-btn');
const overlay = $('#overlay');

$('.navbar-nav-link').click((e) => {
    const sectionId = $(e.target).attr('data-navigation');
    const isMobile = $(e.target).hasClass('mobile');

    e.preventDefault();

    if (isMobile) {
        overlay.removeClass('active');
        mobileNav.removeClass('open');
        burgerBtn.removeClass('open');

    }

    $('html, body').animate({
        scrollTop: $(`#${sectionId}-section`).offset().top
    }, 500);
});

$('#overlay').click(() => {
    overlay.removeClass('active');
    mobileNav.removeClass('open');
    burgerBtn.removeClass('open');
})

const toggleSideNav = () => {

    overlay.toggleClass('active');
    mobileNav.toggleClass('open');
    burgerBtn.toggleClass('open');
}

// $('.project').mouseleave(() => {
//     console.log('now')
// })