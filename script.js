// $(document).ready(() => {
    const intersectionSections = Array.from(document.getElementsByClassName('intersection-section'));
    const options = {
        root: null,
        threshold: 0.5,
        // rootMargin: "-150px"
    };

    console.log(intersectionSections)

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                console.log("I'm here");
                const animateEls = $(entry.target).find('.animate');

                animateEls.each((i, el) => {
                    if($(el).attr('data-delay')) {
                        $(el).css('transition-delay', `${$(el).attr('data-delay')}`);
                    } 

                    if($(el).attr('data-width')) {
                        $(el).css('width', `${$(el).attr('data-width')}`);
                    }
                    
                    $(el).addClass('activate');
                })

                // animateEls.addClass('activate');
            }

        })
    }, options);

    intersectionSections.forEach(section => {
        observer.observe(section);
    });
// })