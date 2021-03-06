var app = app || {};
app.black = true;
app.play = false;

$(document).ready(function() {
    // console.log(app, 'from square');
    var xSeparation = 1.05, ySeparation = 1.05, xNum = 45, yNum = 45,
        mouseX = 0, mouseY = 0,
        windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2;
    var camera, scene;
    init();
    function init() {
        scene = new THREE.Scene();
        var width = window.innerWidth;
        var height = window.innerHeight;

        var fov = 30;
        // var fov = 60;

        renderer = new THREE.CanvasRenderer();
        app.renderer = renderer;
        renderer.setSize(width, height);
        document.body.appendChild(app.renderer.domElement);

        camera = new THREE.PerspectiveCamera(fov, width / height, 1, 10000);
        camera.position.set(0, 0, 175);
        // camera.position.set(0, 0, 75);

        renderer.setClearColor(0x000000, 1);
        // CHANGE THIS into a function with an event lisenter instead
        window.addEventListener('resize', function () {
            width = window.innerWidth;
            height = window.innerHeight;
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        var PI2 = Math.PI * 2;
        particles = new Array();

        // move this into the particle generating loop for color changing, but prevents bottom tiles from being accessed for rotation

        var i = 0;
        for (var iy = 0; iy < yNum; iy++) {
            var material = new THREE.SpriteMaterial({
                color: 0xffffff
            });
            for (var ix = 0; ix < xNum; ix++) {
                var particle = particles[i++] = new THREE.Particle(material);
                particle.position.x = ix * xSeparation - (( xNum * xSeparation ) / 2);
                particle.position.y = iy * ySeparation - (( yNum * ySeparation ) / 2);
                scene.add(particle);
            }
        }

        function onKeyDown(e) {
            switch (e.which) {
                case 32:
                    if (app.windowWidth > 780) {
                        if (app.play) {
                            app.audio.pause();
                            app.pauseButton = true;
                            app.play = false;
                            $('#pause-button').css('display', 'none');
                            $('#play-button').css('display', 'block');
                        } else {
                            app.audio.play();
                            app.pauseButton = false;
                            app.play = true;
                            $('#pause-button').css('display', 'block');
                            $('#play-button').css('display', 'none');
                        }
                    }
                    break;
                case 84:
                    if (app.black) {
                        app.renderer.setClearColor(0xffffff, 1);
                        for (var i = 0; i <= particles.length; i++) {
                            particle = particles[i++];
                            particle.material.color.setHex(0x000000);
                        }
                        app.black = false
                    }
                    else {
                        app.renderer.setClearColor(0x000000, 1);
                        for (var i = 0; i <= particles.length; i++) {
                            particle = particles[i++];
                            particle.material.color.setHex(0xffffff);
                        }
                        app.black = true
                    }
            }
            return false;
        }

        function onDocumentMouseMove(e) {
            mouseX = e.clientX - windowHalfX;
            mouseY = e.clientY - windowHalfY;
        }

        function onDocumentTouchStart(e) {
            if (e.touches.length === 1) {
                mouseX = e.touches[0].pageX - (windowHalfX - 10);
                mouseY = e.touches[0].pageY - (windowHalfY - 10);
            }
        }

        function onDocumentTouchMove(e) {
            if (e.touches.length === 1) {
                mouseX = e.touches[0].pageX - (windowHalfX - 10);
                mouseY = e.touches[0].pageY - (windowHalfY - 10);
            }
        }

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        document.addEventListener('keydown', onKeyDown, false);

        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        var audio = document.querySelector('audio');
        var audioSrc = ctx.createMediaElementSource(audio);
        var analyser = ctx.createAnalyser();
        app.ctx = ctx;
        app.audio = audio;
        app.audio.volume = 0.25;

        audioSrc.connect(analyser);
        analyser.connect(ctx.destination);

        function animate() {
            var timeFrequencyData = new Uint8Array(analyser.fftSize);
            analyser.getByteTimeDomainData(timeFrequencyData);
            requestAnimationFrame(animate);
            if(app.windowWidth < 780) {
                for (var j = 0; j <= particles.length; j++) {
                    particle = particles[j++];
                    particle.material.rotation += 0.0008;
                }
            }
            else {
                for (var j = 0; j <= particles.length; j++) {
                    particle = particles[j++];
                    particle.position.z = (timeFrequencyData[j] / 7);
                    particle.material.rotation += 0.0003;
                }
            }
            camera.position.x = ( mouseX - camera.position.x ) * 0.05;
            camera.position.y = ( -mouseY - camera.position.y ) * 0.075;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }
        animate();
    }

});