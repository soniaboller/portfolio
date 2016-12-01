console.log('app connected');

var app = app || {};
app.aboutClicked = false;
app.projectClicked = false;
app.black = true;
app.modalClicked = false;

$(document).ready(function() {
    $('button').mouseup(function(){
        $(this).blur();
    });
    $('#about-button').on('click', aboutClick);
    $('#projects-button').on('click', projectClick);
    $('.project-image').on('click', projectImageClick);
    function aboutClick(){
        changeColor();
        if (!app.aboutClicked){
            $('#showAbout').velocity('fadeIn', { duration: 1000 });
            $('#name').typed({
                strings: ["Hellooooo! Dis be Sonia Boller."],
                typeSpeed: -50,
                startDelay: 0,
                showCursor: false
            });
            $('#information').typed({
                strings: ["I'm a web developer, yada yada yada, hire me and I'll do cool shit."],
                typeSpeed: -50,
                startDelay: 0,
                showCursor: false,
                callback: function() {
                    $('#interests').velocity('fadeIn', { duration: 500});
                    $('#interests-list').typed({
                        strings: ['tacos','hiking','hiking with tacos','puppies','the ocean','curly fries','bon iver'],
                        typeSpeed: 0,
                        startDelay: 0,
                        backDelay: 500,
                        loop: true,
                        showCursor: false
                    });
                }
            });
            app.aboutClicked = !app.aboutClicked;
        }
        else{
            $('#showAbout').velocity("slideUp", { duration: 1000 });
            app.aboutClicked = !app.aboutClicked;
        }
    }
    function projectClick(){
        console.log('hit project click');
        changeColor();
        if (!app.projectClicked){
            console.log('hit project click to open');
            $('#showProjects').velocity("slideDown", { duration: 1000 });
            app.projectClicked = !app.projectClicked;
        }
        else{
            console.log('hit project clicked to close');
            $('#showProjects').velocity("slideUp", { duration: 1000 });
            app.projectClicked = !app.projectClicked;
        }
        if(app.modalClicked){
            clearModal();
        }
    }
    function changeColor(){
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
    function projectImageClick(){
        if (!app.modalClicked) {
            $('#page-wrapper').addClass('modalOpen');
            var self = this;
            console.log(self);
            var imageSrc = $(self)[0].src;
            $('#modal').append('<img src="' + imageSrc + '">');
            app.modalClicked = !app.modalClicked;
            if (app.modalClicked){
                $('#showProjects').velocity("slideUp", { duration: 500 });
                $('#showAbout').velocity("slideUp", { duration: 500 });
                app.projectClicked = false;
            }
        }
    }
    function clearModal(){
        $('#page-wrapper').removeClass('modalOpen');
        $('#modal').empty();
        app.modalClicked = !app.modalClicked;
    }
    $('canvas').on('click', function(){
        console.log('hit');
        if(app.modalClicked){
            clearModal()
        }
    });

    // add event listener for escape key to remove modal

    $(document).on('click', function(){
        console.log(app)
    });

    // $('.project-image').on('mouseenter', function(){
    //     var self = this;
    //     // $(self).css('opacity','0.5');
    //     // $(self).children().last().velocity('fadeIn', { duration: 1000 });
    //     // console.log(selfie);
    //     $(self).next().velocity('fadeIn', { duration: 1000 });
    // }).on('mouseleave', function(){
    //     var self = this;
    //     // $(self).css('opacity','1');
    //     // $(self).children().last().velocity('fadeOut', { duration: 1000 });
    //     $(self).next().velocity('fadeOut', { duration: 1000 });
    // });
});