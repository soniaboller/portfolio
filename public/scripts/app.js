console.log('app connected');

var app = app || {};
app.aboutClicked = false;
app.projectClicked = false;
app.black = true;
app.modalClicked = false;

$(document).ready(function() {
    var windowWidth;
    $(window).on('resize',checkWindowWidth);
    $('#about-button').on('click', aboutClick);
    $('#projects-button').on('click', projectClick);
    $('.project-image').on('click', projectImageClick)
        .on('mouseenter', function(){
        var self = this;
        $(self).addClass('project-image-hover')
        })
        .on('mouseleave', function(){
            var self = this;
            $(self).removeClass('project-image-hover')
    });

    $('canvas').on('click', function(){
        if(app.modalClicked){
            clearModal()
        }
    });

    $('button').mouseup(function(){
        $(this).blur();
    });

    $('body').keydown(function(e){
        if(e.which === 27 && app.modalClicked) {
            clearModal();
        }
    });

    function checkWindowWidth(){
        windowWidth = $(window).width();
    }

    function aboutClick(){
        changeColor();
        if (!app.aboutClicked){
            $('#show-about').velocity('fadeIn', { duration: 1000 });
            // $('#name').typed({
            //     strings: ["Hellooooo! Dis be Sonia Boller."],
            //     typeSpeed: -50,
            //     startDelay: 0,
            //     showCursor: false
            // });
            // $('#information').typed({
            //     strings: ["I'm a web developer, yada yada yada, <br> hire me and I'll do cool shit."],
            //     typeSpeed: -50,
            //     startDelay: 0,
            //     showCursor: false,
            //     callback: function() {
            //         $('#interests').velocity('fadeIn', { duration: 500});
            //         $('#interests-list').typed({
            //             strings: ['tacos','hiking','hiking with tacos','puppies','the ocean','curly fries','bon iver'],
            //             typeSpeed: 0,
            //             startDelay: 0,
            //             backDelay: 500,
            //             loop: true,
            //             showCursor: false
            //         });
            //     }
            // });
            $('#skills').velocity('fadeIn', { delay: 1000, duration: 1000});
            $('#skills-list').typed({
                strings: [' THREE.js',' Web Audio API',' React',' Node / Express',' Ruby / Sinatra', ' MySQL'],
                typeSpeed: 10,
                startDelay: 0,
                backDelay: 500,
                loop: true,
                showCursor: false
            });
            // $('#interests').velocity('fadeIn', { delay: 3000, duration: 1000});
            // $('#interests-list').typed({
            //     strings: ['HIKING','BON IVER','TACOS','PHOTOGRAPHY','TREES','PUPPIES','TEA'],
            //     typeSpeed: 0,
            //     startDelay: 0,
            //     backDelay: 500,
            //     loop: true,
            //     showCursor: false
            // });
            app.aboutClicked = !app.aboutClicked;
        }
        else{
            $('#show-about').velocity('slideUp', { duration: 500 });
            $('#skills').velocity('fadeOut', { duration: 150});
            app.aboutClicked = !app.aboutClicked;
        }
    }

    function projectClick(){
        changeColor();
        if (!app.projectClicked){
            $('#show-projects').velocity("slideDown", { duration: 1000 });
            app.projectClicked = !app.projectClicked;
        }
        else{
            $('#show-projects').velocity("slideUp", { duration: 1000 });
            app.projectClicked = !app.projectClicked;
        }
        if (app.modalClicked){
            clearModal();
        }
    }

    function changeColor(){
        if (windowWidth > 414){
            if (app.black) {
                $('body').css('backgroundColor', '#fff');
                $(".about-box").addClass('about-box-border');
                $("#about-button, #projects-button").addClass('button-clicked');
                // console.log(button)
                renderer.setClearColor(0xffffff, 1);
                for (var i = 0; i <= particles.length; i++) {
                    particle = particles[i++];
                    particle.material.color.setHex(0x000000);
                }
                app.black = !app.black;
            }
            else {
                $('body').css('backgroundColor', '#000');
                $(".about-box").removeClass('about-box-border');
                $("#about-button, #projects-button").removeClass('button-clicked');
                renderer.setClearColor(0x000000, 1);
                for (var i = 0; i <= particles.length; i++) {
                    particle = particles[i++];
                    particle.material.color.setHex(0xffffff);
                }
                app.black = !app.black;
            }
        }
    }

    function projectImageClick(){
        if (!app.modalClicked) {
            $('#page-wrapper').addClass('modalOpen');
            var self = this;
            console.log(self);
            var imageSrc = $(self)[0].src;
            $('#modal').append('<img src="' + imageSrc + '">');
            app.modalClicked = !app.modalClicked;
            if (app.modalClicked){
                $('#show-projects').velocity("slideUp", { duration: 500 });
                $('#show-about').velocity("slideUp", { duration: 500 });
                app.projectClicked = false;
            }
        }
    }

    function clearModal(){
        $('#page-wrapper').removeClass('modalOpen');
        $('#modal').empty();
        app.modalClicked = !app.modalClicked;
    }

    $(document).on('click', function(){
        console.log(app)
    });
});