(function ($) {
    $.fn.menumaker = function (options) {
        var cssmenu = $(this), settings = $.extend({
            format: "dropdown",
            sticky: false
        }, options);
        return this.each(function () {
            $(this).find(".button").on('click', function () {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.slideToggle().removeClass('open');
                } else {
                    mainmenu.slideToggle().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });
            cssmenu.find('li ul').parent().addClass('has-sub');
            multiTg = function () {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideToggle();
                    } else {
                        $(this).siblings('ul').addClass('open').slideToggle();
                    }
                });
            };
            if (settings.format === 'multitoggle')
                multiTg();
            else
                cssmenu.addClass('dropdown');
            if (settings.sticky === true)
                cssmenu.css('position', 'fixed');
            resizeFix = function () {
                var mediasize = 1000;
                if ($(window).width() > mediasize) {
                    cssmenu.find('ul').show();
                }
                if ($(window).width() <= mediasize) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };
})(jQuery);


(function ($) {
    $(document).ready(function () {

        if($('.ks-intro-transform').hasClass('right-left-slope')) {
            $('.ks-intro-transform').css('margin-top', '-230px');
            $('.ks-intro-transform .container').css('padding', '65px 50px 0 50px');
            $('.ks-intro img').first().css({
                'margin-top': '-168px',
                'margin-bottom': '-19px'
            });
            if (($(window).width() > 992)) {
                $('.ks-paragraph-intro .highlight-upper-line').css('margin-top', '277px');
            }
            else {
                $('.ks-paragraph-intro .highlight-upper-line').css('margin-top', '212px');
            }
        }

        if($('.ks-intro-transform-mobile-tablet').hasClass('right-left-slope-small-devices')) {
            if ($(window).width() > 767 && $(window).width() <= 991) {
                $('.ks-intro-transform-mobile-tablet').css('margin-top', '50px');
                $('.ks-intro img').slice(1, 2).css({
                    'margin-top': '-50px'
                });
            } else if($(window).width() < 767) {
                $('.ks-intro img').slice(1, 2).css({
                    'margin-top': '-100px'
                });
            }
        }


        if ($('.ks-clients').hasClass('right-left-slope')) {
            $('.ks-clients .container').css('padding', '80px 0 569px');
            $('.ks-clients').css('margin-top', '117px');
        }

        if ($('.ks-contact-transform').hasClass('left-right-slope')) {

            if ($(window).width() > 767 && $(window).width() <= 991) {
                $('.ks-contact-transform').css({
                    'margin-bottom': '-140px',
                    'margin-top': '265px'
                });
            }
            else if ($(window).width() <= 767) {
                $('.ks-contact-transform').css({
                    'margin-bottom': '-100px',
                    'margin-top': '-385px'
                });
            }
            else {
                $('.ks-contact-transform').css({
                    'margin-bottom': '-220px',
                    'margin-top': '-240px'
                });
            }
            $('.ks-contact-transform .container').css('padding', '0 150px 0 155px');
        }

        $("#cssmenu").menumaker({
            format: "multitoggle"
        });
        $("#second-cssmenu").menumaker({
            format: "multitoggle"
        });

        $(document).on('click', '.ks-contact-initial a', function (e) {
            e.preventDefault();
            $('.ks-contact-initial').addClass('slide-up');
            $('.ks-contact-expanded').addClass('slide-down');

            if ($(window).width() <= 767) {
                $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 240, 'linear');
            } else {
                $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 620, 'linear');
            }
        });

        $(document).on('click', '.cssmenu-contact', function (e) {

            e.preventDefault();
            $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 720, 'linear');

        });

        $(document).on('click', '.contact-us', function () {
            if ($(window).width() > 767) {
                $('.ks-contact').find('.container').first()
                    .delay(550).queue(function (next) {
                    $(this).css('padding', '0');
                    next();
                });
            }
            else {
                $('.ks-contact').find('.container').first()
                    .delay(550).queue(function (next) {
                    $(this).css('padding', '0 80px');
                    next();
                });
            }
        });

        $("#myCarousel").swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') $(this).carousel('next');
                if (direction == 'right') $(this).carousel('prev');
            },
            allowPageScroll: "vertical"
        });

        $(window).on("load resize scroll", function (e) {
            var scrollTop = $(document).scrollTop();
            if (window.innerWidth > 1017){
                if (scrollTop > 500) {
                    $('#second-cssmenu').addClass('visible');
                } else {
                    $('#second-cssmenu').removeClass('visible');
                }
            }
        });
        $('.ks-contact-expanded .row .col-xs-7 input, textarea').focus(function () {
            $(this).siblings('label').addClass('focusInput');
        });
        $('.ks-contact-expanded .row .col-xs-7 input, textarea').blur(function () {
            if(!$(this).val()){
                $(this).siblings('label').removeClass('focusInput');
            }
        });


        $(document).on('submit', 'form', function (e){

            $('.name-validation').removeClass('validate-slide-down').css('padding-top', '0');
            $('.email-validation').removeClass('validate-slide-down').css('padding-top', '0');
            $('.comment-validation').removeClass('validate-slide-down').css('padding-top', '0');

            var name = $('#name').val();
            var email = $('#e-mail').val();
            var emailLength = email.substr(0, email.indexOf('@')).length;

            var name_regex = /(:?[a-zA-Z]+\s?)/;
            var email_regex = /[\w\-\.\+]{5,}\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

            var newHeight = 0;

            if (!name.match(name_regex) || name.length === 0) {
                if (name.length === 0) {
                    $('.name-error p').text('Please provide a name');
                }
                else {
                    $('.name-error p').text('Invalid name');
                }
                $('.ks-contact-expanded input').first().css('margin-bottom', '18px');
                $('.ks-contact-expanded .col-xs-7').slice(0, 1).css('margin-bottom', '30px');
                $('.name-validation').css('padding-top', '9px').addClass('validate-slide-down');
                newHeight++;
                e.preventDefault();
            }

            if (!email.match(email_regex) || email.length === 0) {
                if (email.length === 0) {
                    $('.email-error p').text('Please provide an e-mail address');
                }
                else if (emailLength > 0 && emailLength  < 6) {
                    $('.email-error p').text('E-mail must be of at least 5 characters');
                }
                else {
                    $('.email-error p').text('Invalid e-mail address');
                }
                $('.email-validation').css('padding-top', '9px').addClass('validate-slide-down');
                $('.ks-contact-expanded input').slice(1, 2).css('margin-bottom', '18px');
                $('.ks-contact-expanded .col-xs-7').slice(1, 2).css('margin-bottom', '30px');
                newHeight++;
                e.preventDefault();
            }

            switch (newHeight) {
                case 1:
                   $('.slide-down').css('max-height', '630px');
                   break;
                case 2:
                    $('.slide-down').css('max-height', '660px');
                    break;
            }

        });
    });
})(jQuery);

$(function () {
    $('#scroll-down a').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });
});