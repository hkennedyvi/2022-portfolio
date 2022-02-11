// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
//   }

const intersectionSections = Array.from(document.getElementsByClassName('intersection-section'));
const options = {
    root: null,
    threshold: 0.5,
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
const docBody = $('body');

$('.navbar-nav-link').click((e) => {
    const sectionId = $(e.target).attr('data-navigation');
    const isMobile = $(e.target).hasClass('mobile');

    e.preventDefault();

    if (isMobile) {
        docBody.removeClass('open-nav');
        overlay.removeClass('active');
        mobileNav.removeClass('open');
        burgerBtn.removeClass('open');
    }

    $('html, body').animate({
        scrollTop: $(`#${sectionId}-section`).offset().top
    }, 500);
});

$('#overlay').click(() => {
    docBody.removeClass('open-nav');
    overlay.removeClass('active');
    mobileNav.removeClass('open');
    burgerBtn.removeClass('open');
});

const toggleSideNav = () => {
    docBody.toggleClass('open-nav');
    overlay.toggleClass('active');
    mobileNav.toggleClass('open');
    burgerBtn.toggleClass('open');
};

// $('.project').mouseleave(() => {
//     console.log('now')
// })
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const submitForm = e => {
    const form = $('#contact-form');
    const name = form.find('#name-input').val();
    const email = form.find('#email-input').val();
    const message = form.find('#message-input').val();
    e.preventDefault();

    !validateEmail(email) ? form.find('#email-input').siblings('.error-msg').addClass('show') : form.find('#email-input').siblings('.error-msg').removeClass('show');

    name == '' ? form.find('#name-input').siblings('.error-msg').addClass('show') : form.find('#name-input').siblings('.error-msg').removeClass('show');

    message == '' ? form.find('#message-input').siblings('.error-msg').addClass('show') : form.find('#message-input').siblings('.error-msg').removeClass('show');


    if (!validateEmail(email) || name == '' || message == '') {
        return;
    } else {

        const formData = {
            name: name,
            email: email,
            message: message
        }

        fetch("/send", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(res => {
            console.log("Request complete! response:", res);
        });

        $('.success-msg').addClass('show');
    }

}