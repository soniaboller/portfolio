console.log('app connected');

var app = app || {};
app.aboutClicked = false;
app.projectClicked = false;
app.black = true;

$(document).ready(function() {
    $('#about-button').on('click', aboutClick);
    $('#projects-button').on('click', projectClick);

    function aboutClick(){
        changeColor();
        if (!app.aboutClicked){
            $('#showAbout').velocity('fadeIn', { duration: 1000 });
            $('#name').typed({
                strings: ["Hellooooo! Dis be Sonia Boller."],
                typeSpeed: -20,
                startDelay: 0,
                showCursor: false,
                callback: function() {
                    $('#information').typed({
                        strings: ["I'm a web developer, yada yada yada, hire me and I'll do cool shit."],
                        typeSpeed: -20,
                        startDelay: 1500,
                        showCursor: false,
                        callback: function() {
                            $('#interests').velocity('fadeIn', { duration: 500});
                            $('#interests-list').typed({
                                strings: ['tacos','hiking','hiking with tacos','dogs'],
                                typeSpeed: 0,
                                startDelay: 0,
                                backDelay: 500,
                                loop: true,
                                showCursor: false
                            });
                        },
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
        changeColor();
        if (!app.projectClicked){
            $('#showProjects').velocity("slideDown", { duration: 1000 });
            app.projectClicked = !app.projectClicked;
        }
        else{
            $('#showProjects').velocity("slideUp", { duration: 1000 });
            app.projectClicked = !app.projectClicked;
        }
    }
    function changeColor(){
        if (app.black) {
            $('body').css('background-color', '#fff');
            $("#about-button, #projects-button").addClass('button-clicked');
            // console.log(button)
            renderer.setClearColor(0xffffff, 1);
            for (var i = 0; i <= particles.length; i++) {
                particle = particles[i++];
                particle.material.color.setHex(0x000000);
            }
            app.black = false
        }
        else {
            $('body').css('background-color', '#000');
            $("#about-button, #projects-button").removeClass('button-clicked');
            renderer.setClearColor(0x000000, 1);
            for (var i = 0; i <= particles.length; i++) {
                particle = particles[i++];
                particle.material.color.setHex(0xffffff);
            }
            app.black = true
        }
    }
});