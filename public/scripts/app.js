var app = app || {};
app.aboutClicked = false;
app.projectClicked = false;
app.black = true;
app.modalClicked = false;
app.projects = {
    colorTheory: {
        link: 'https://soniaboller.github.io/color-theory/',
        information: 'Test your color skills by clicking on the darker boxes sandwiched between two lighter ones.',
        technology: 'HTML5, CSS, and jQuery'
    } ,
    cameralessConcerts: {
        link: 'https://github.com/karlyhoffman/project-2',
        information: 'Collective sharing platform for concert photos.',
        technology: 'Node / Express, mySQL, Bookshelf, Handlebars, Sass'
    },
    beerCrawl: {
        link: 'https://github.com/BendyW/beercrawl-app-client',
        information: 'Create a user. Join a team. Join an event as a team. Go on a beer crawl scavenger hunt.',
        technology: 'Angular, Google Maps API, mySQL Ruby / Sinatra, Sass'
    },
    audibleVisuals: {
        link: 'http://104.131.102.98/',
        information: 'Drag a song from your computer, see visualization on screen.',
        technology: 'THREE.js, Web Audio API, Node / Express'
    },
    ticTacToe: {
        link: 'https://soniaboller.github.io/tictactoe',
        information: 'Presidential candidate themed version of tic-tac-toe',
        technology: 'HTML5, CSS, and jQuery'
    }
};
app.icons = {
    black : {
        github: '/images/social-media/github-black.png',
        linkedin: '/images/social-media/linkedin-black.png',
        instagram: '/images/social-media/instagram-black.png',
        email: '/images/social-media/mail-black.png'
    },
    white: {
        github: '/images/social-media/github-white.png',
        linkedin: '/images/social-media/linkedin-white.png',
        instagram: '/images/social-media/instagram-white.png',
        email: '/images/social-media/mail-white.png'
    }
};

$(document).ready(function() {
    app.windowWidth = $(window).width();
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
        app.windowWidth = $(window).width();
    }

    function aboutClick(){
        changeColor();
        if (app.modalClicked) clearModal();
        if (!app.aboutClicked){
            if(app.windowWidth < 415){
                $('#show-about').velocity('fadeIn', { duration: 1000 });
            }
            else {
                $('#show-about').velocity('slideDown', { duration: 1000 });
            }
            $('#skills').velocity('fadeIn', { delay: 750, duration: 750});
            $('#skills-list').typed({
                strings: [' THREE.js',' Web Audio API',' React',' Node / Express',' Ruby / Sinatra', ' MySQL'],
                typeSpeed: 10,
                startDelay: 0,
                backDelay: 500,
                loop: true,
                showCursor: false
            });
        }
        else {
            if (app.windowWidth < 415){
                $('#show-about').velocity('fadeOut', { duration: 1000 });
            }
            else {
                $('#show-about').velocity('slideUp', { duration: 500 });
            }
            $('#skills').velocity('fadeOut', { duration: 150});
        }
        if (app.projectClicked && app.windowWidth < 415){
            $('#show-projects').velocity('fadeOut', { duration: 1000 });
            app.projectClicked = !app.projectClicked;
        }
        app.aboutClicked = !app.aboutClicked;
    }

    function projectClick(){
        changeColor();
        if (app.modalClicked) clearModal();
        if (!app.projectClicked){
            if(app.windowWidth < 415){
                $('#show-projects').velocity('fadeIn', { duration: 1000 });
            }
            else {
                $('#show-projects').velocity('slideDown', { duration: 1000 });
            }
        }
        else{
            if (app.windowWidth < 415){
                $('#show-projects').velocity('fadeOut', { duration: 1000 });
            }
            else {
                $('#show-projects').velocity('slideUp', { duration: 500 });
            }
        }
        if(app.aboutClicked && app.windowWidth < 415){
            $('#show-about').velocity('fadeOut', { duration: 1000 });
            app.aboutClicked = !app.aboutClicked;
        }
        app.projectClicked = !app.projectClicked;
    }

    function changeColor(){
        var instagram = $('#instagram');
        if (app.windowWidth >= 960){
            if (app.black) {
                $('body').css('backgroundColor', '#fff');
                $('.about-box').addClass('about-box-border');
                $('#about-button, #projects-button').addClass('button-clicked');
                $('#github').attr('src', app.icons.black.github);
                $('#linkedin').attr('src', app.icons.black.linkedin);
                $('#instagram').attr('src', app.icons.black.instagram);
                $('#email').attr('src', app.icons.black.email);
                renderer.setClearColor(0xffffff, 1);
                for (var i = 0; i <= particles.length; i++) {
                    particle = particles[i++];
                    particle.material.color.setHex(0x000000);
                }
                app.black = !app.black;
            }
            else {
                $('body').css('backgroundColor', '#000');
                $('.about-box').removeClass('about-box-border');
                $('#about-button, #projects-button').removeClass('button-clicked');
                $('#github').attr('src', app.icons.white.github);
                $('#linkedin').attr('src', app.icons.white.linkedin);
                $('#instagram').attr('src', app.icons.white.instagram);
                $('#email').attr('src', app.icons.white.email);
                renderer.setClearColor(0x000000, 1);
                for (var i = 0; i <= particles.length; i++) {
                    particle = particles[i++];
                    particle.material.color.setHex(0xffffff);
                }
                app.black = !app.black;
            }
        }
        else{
            $('#github').attr('src', app.icons.white.github);
            $('#linkedin').attr('src', app.icons.white.linkedin);
            $('#instagram').attr('src', app.icons.white.instagram);
            $('#email').attr('src', app.icons.white.email);
        }
    }

    function projectImageClick(){
        if (!app.modalClicked) {
            var backgroundColor = $('body')[0].style.backgroundColor;
            $('#modal').css('backgroundColor', backgroundColor)
            $('#page-wrapper').addClass('modalOpen');
            var self = this;
            var imageSrc = $(self)[0].src;
            var imageName = $(self)[0].alt;
            if (imageName == 'COLOR THEORY'){
                var projectLink = app.projects.colorTheory.link;
                var projectInformation = app.projects.colorTheory.information;
                var projectTechnology = app.projects.colorTheory.technology;
            }
            else if (imageName == 'CAMERALESS CONCERTS'){
                var projectLink = app.projects.cameralessConcerts.link;
                var projectInformation = app.projects.cameralessConcerts.information;
                var projectTechnology = app.projects.cameralessConcerts.technology;
            }
            else if (imageName == 'AUDIBLE VISUALS'){
                var projectLink = app.projects.audibleVisuals.link;
                var projectInformation = app.projects.audibleVisuals.information;
                var projectTechnology = app.projects.audibleVisuals.technology;
            }
            else if (imageName == 'TIC TAC NOPE'){
                var projectLink = app.projects.ticTacToe.link;
                var projectInformation = app.projects.ticTacToe.information;
                var projectTechnology = app.projects.ticTacToe.technology;
            }
            else {
                var projectLink = app.projects.audibleVisuals.link;
                var projectInformation = app.projects.audibleVisuals.information;
                var projectTechnology = app.projects.audibleVisuals.technology;
            }
            $('#modal').append('<h4>' + imageName + '</h4>')
                       .append('<a href="'+ projectLink +'" target="_blank">'+ '<img src="' + imageSrc + '">' + '</a>')
                       .append('<p>' + projectInformation + '</p>')
                       .append('<p> Built with: ' + projectTechnology + '</p>');
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

    // var audio = $('audio')[0];
    // audio.volume = 0.33;
});