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
            })

           
            // animateEls.addClass('activate');
        }

    })
}, options);

intersectionSections.forEach(section => {
    observer.observe(section);
});

$('input, textarea').focus((e) => {
    console.log($(e.target).siblings())
    $('#contact-form').find('.underline').removeClass('focused');
    $(e.target).siblings().addClass('focused')

});

// $('.navbar-nav-link').click((e) => {
//     const sectionId = $(e.target).attr('data-navigation');
//     const padOffset = '10rem'

//     e.preventDefault();

//     $('html, body').animate({
//         scrollTop: ($(`#${sectionId}-section`).offset().top + padOffset)
//       }, 500);

// });

$('.project').mouseleave(() => {
    console.log('now')
})