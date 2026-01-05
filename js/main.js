// Yandex Map initialization
function initMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function () {
            var studioCoords = [55.755905, 37.650927];
            var metroKurskayaCoords = [55.758739, 37.659294];
            
            // Center between metro and studio for better view
            var centerCoords = [
                (studioCoords[0] + metroKurskayaCoords[0]) / 2,
                (studioCoords[1] + metroKurskayaCoords[1]) / 2
            ];
            
            var map = new ymaps.Map('yandex-map', {
                center: centerCoords,
                zoom: 15,
                controls: ['zoomControl', 'fullscreenControl']
            });

            // Studio marker - big red icon
            var studioPlacemark = new ymaps.Placemark(studioCoords, {
                balloonContent: '<strong>Asakusa Lab</strong><br>Казарменный переулок, 8с2<br>вход с зелёным фонарём',
                hintContent: 'Asakusa Lab',
                iconCaption: 'Asakusa Lab'
            }, {
                preset: 'islands#redCircleDotIconWithCaption'
            });

            // Metro marker
            var metroPlacemark = new ymaps.Placemark(metroKurskayaCoords, {
                balloonContent: '<strong>М Курская</strong><br>5-10 минут пешком до студии',
                hintContent: 'М Курская',
                iconCaption: 'М Курская'
            }, {
                preset: 'islands#blueCircleDotIconWithCaption'
            });

            map.geoObjects.add(studioPlacemark);
            map.geoObjects.add(metroPlacemark);

            // Draw a simple walking path line from metro to studio
            var walkingPath = new ymaps.Polyline([
                metroKurskayaCoords,
                [55.757500, 37.655500],
                [55.756200, 37.652000],
                studioCoords
            ], {
                hintContent: 'Пешком ~10 минут'
            }, {
                strokeColor: '#ff3333',
                strokeWidth: 4,
                strokeStyle: 'shortdash',
                opacity: 0.8
            });
            
            map.geoObjects.add(walkingPath);
        });
    }
}

// Smooth scroll navigation
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Yandex Map
    initMap();
    
    // Handle navigation links - smooth scroll only
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle scroll down arrow
    const scrollDownArrow = document.querySelector('.scroll-down');
    if (scrollDownArrow) {
        scrollDownArrow.addEventListener('click', () => {
            const currentSection = scrollDownArrow.closest('.screen');
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});
