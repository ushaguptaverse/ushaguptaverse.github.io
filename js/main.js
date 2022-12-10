(function($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function() {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function() {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function() {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Price carousel
    $(".price-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });


    // Team carousel
    $(".team-carousel, .related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

})(jQuery);

(function() {
    "use strict";
    try {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        loadData(params.ext)
    } catch (err) {
    }
})();

async function loadData(query) {
    query = query ? query : constants.defaultExtension
    let data = ext_data[`ext_${query}`]
    if (!data) {
        query = constants.defaultExtension
        data = ext_data[`ext_${query}`]
    }

    const titleIconElement = document.getElementById('idTitleIcon')
    titleIconElement.classList.add(data?.['title_icon']);

    const titleTextElement = document.getElementById('idTitleText')
    titleTextElement.appendChild(document.createTextNode(data?.['title']))

    const aboutUsTextElement = document.getElementById('idAboutUsText')
    aboutUsTextElement.appendChild(document.createTextNode(data?.['about_us']?.text))

    const aboutUsSubTextElement = document.getElementById('idAboutUsSubText')
    aboutUsSubTextElement.appendChild(document.createTextNode(data?.['about_us']?.['sub_text']))

    const servicesListElement = document.getElementById('idServicesList') 

    const servicesListInnerHtmlElement = data?.['about_us']?.['services'].reduce((acc, service) => {
        return acc.concat(createServicesElement(service?.['icon'], service?.['text'], service?.['sub_text']))
    }, '')

    servicesListElement.innerHTML = servicesListInnerHtmlElement

    const instructionsListElement = document.getElementById('idInstructionsList') 

    const instructionsListInnerHtmlElement = data?.['get_started'].reduce((acc, instruction) => {
        return acc.concat(createInstructionsElement(instruction?.['icon'], instruction?.['text'], instruction?.['sub_text']))
    }, '')

    instructionsListElement.innerHTML = instructionsListInnerHtmlElement
}

function createServicesElement(serviceIcon, serviceText, serviceSubText) {

    return `<div class="col-lg-4 col-md-4 col-xs-3">
    <div class="bg-light text-center rounded-circle py-4">
        <i class="fa fa-3x ${serviceIcon || ''} text-primary mb-3"></i>
        <h6 class="mb-0">${serviceText || ''}<small class="d-block text-primary">${serviceSubText || ''}</small></h6>
    </div>
</div>`

}

function createInstructionsElement(instructionIcon, instructionText, instructionSubText) {
    return `<div class="col-lg-6 col-md-6 col-xs-12">
    <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
        <div class="service-icon mb-4">
            <i class="fa fa-2x ${instructionIcon || ''} text-white"></i>
        </div>
        <h4 class="mb-3">${instructionText}</h4>
        <p class="m-0">${instructionSubText}</p>
    </div>
</div>`
}