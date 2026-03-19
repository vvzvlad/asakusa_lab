// Yandex Map initialization
function initMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function () {
            var studioCoords = [55.755905, 37.650927];
            
            var map = new ymaps.Map('yandex-map', {
                center: studioCoords,
                zoom: 14,
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

            map.geoObjects.add(studioPlacemark);
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
