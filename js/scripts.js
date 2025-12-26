/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
            // remove focus after click to avoid persistent highlight
            setTimeout(() => { responsiveNavItem.blur(); }, 100);
        });
    });

    // Ensure only one nav-link remains active; fix cases where first link stays highlighted
    document.addEventListener('activate.bs.scrollspy', function () {
        const activeLink = document.querySelector('#sideNav .nav-link.active');
        if (activeLink) {
            document.querySelectorAll('#sideNav .nav-link').forEach(l => {
                if (l !== activeLink) l.classList.remove('active');
            });
        }
    });

    // Gestion de l'opacité du h1 et luminosité de l'image au scroll
    const h1Title = document.querySelector('section#Bio h1.mb-0');
    const bioImage = document.querySelector('.bio-left-img');
    const menuToggle = document.querySelector('.menu-toggle');
    if (h1Title || bioImage) {
        window.addEventListener('scroll', () => {
            const bioSection = document.getElementById('Bio');
            const biographieSection = document.getElementById('biographie');
            
            if (bioSection && biographieSection) {
                const biographieTop = biographieSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                // Quand la section biographie arrive à mi-écran, commencer la transition
                const fadeStart = windowHeight * 0.7;
                const fadeEnd = windowHeight * 0.3;
                
                if (biographieTop > fadeStart) {
                    if (h1Title) h1Title.style.opacity = '1';
                    if (bioImage) bioImage.style.filter = 'brightness(1)';
                    if (menuToggle) menuToggle.style.opacity = '1';
                    if (menuToggle) menuToggle.style.pointerEvents = 'auto';
                } else if (biographieTop < fadeEnd) {
                    if (h1Title) h1Title.style.opacity = '0';
                    if (bioImage) bioImage.style.filter = 'brightness(0.3)';
                    if (menuToggle) menuToggle.style.opacity = '0';
                    if (menuToggle) menuToggle.style.pointerEvents = 'none';
                } else {
                    // Interpolation linéaire entre fadeStart et fadeEnd
                    const range = fadeStart - fadeEnd;
                    const progress = (biographieTop - fadeEnd) / range;
                    const clampedProgress = Math.max(0, progress);
                    if (h1Title) h1Title.style.opacity = clampedProgress.toString();
                    if (bioImage) {
                        // Luminosité entre 1 (normal) et 0.3 (assombri)
                        const brightness = 0.3 + (clampedProgress * 0.7);
                        bioImage.style.filter = `brightness(${brightness})`;
                    }
                    if (menuToggle) menuToggle.style.opacity = clampedProgress.toString();
                    if (menuToggle) menuToggle.style.pointerEvents = clampedProgress > 0.1 ? 'auto' : 'none';
                }
            }
        });
    }

    // Gestion du menu horizontal au hover
    const topNav = document.getElementById('topNav');
    const horizontalMenu = document.getElementById('horizontalMenu');
    const menuToggles = document.querySelectorAll('.menu-toggle');
    let menuTimeout;
    let bioLeftScreen = false;

    if (topNav && horizontalMenu) {
        // Listener pour savoir si Bio est sortie de l'écran
        window.addEventListener('scroll', () => {
            const bioSection = document.getElementById('Bio');
            if (bioSection) {
                const bioBottom = bioSection.getBoundingClientRect().bottom;
                const wasBioLeftScreen = bioLeftScreen;
                bioLeftScreen = bioBottom < 0; // Bio est complètement sortie du haut
                
                if (bioLeftScreen && !wasBioLeftScreen) {
                    // Bio vient de sortir - afficher le menu en permanence
                    horizontalMenu.classList.add('show');
                } else if (!bioLeftScreen && wasBioLeftScreen) {
                    // Bio est de retour - masquer le menu jusqu'au hover
                    horizontalMenu.classList.remove('show');
                }
            }
        });

        // Afficher le menu au survol (seulement si Bio est visible)
        topNav.addEventListener('mouseenter', () => {
            const bioSection = document.getElementById('Bio');
            const bioBottom = bioSection ? bioSection.getBoundingClientRect().bottom : 0;
            if (bioBottom >= 0) { // Bio est encore visible
                clearTimeout(menuTimeout);
                horizontalMenu.classList.add('show');
            }
        });

        // Cacher le menu quand on quitte (seulement si Bio est visible)
        topNav.addEventListener('mouseleave', () => {
            const bioSection = document.getElementById('Bio');
            const bioBottom = bioSection ? bioSection.getBoundingClientRect().bottom : 0;
            if (bioBottom >= 0) { // Bio est encore visible
                menuTimeout = setTimeout(() => {
                    horizontalMenu.classList.remove('show');
                }, 300);
            }
        });

        horizontalMenu.addEventListener('mouseenter', () => {
            const bioSection = document.getElementById('Bio');
            const bioBottom = bioSection ? bioSection.getBoundingClientRect().bottom : 0;
            if (bioBottom >= 0) { // Bio est encore visible
                clearTimeout(menuTimeout);
                horizontalMenu.classList.add('show');
            }
        });

        horizontalMenu.addEventListener('mouseleave', () => {
            const bioSection = document.getElementById('Bio');
            const bioBottom = bioSection ? bioSection.getBoundingClientRect().bottom : 0;
            if (bioBottom >= 0) { // Bio est encore visible
                menuTimeout = setTimeout(() => {
                    horizontalMenu.classList.remove('show');
                }, 300);
            }
        });

        // Fermer le menu quand on clique sur un lien
        const menuLinks = horizontalMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bioSection = document.getElementById('Bio');
                const bioBottom = bioSection ? bioSection.getBoundingClientRect().bottom : 0;
                if (bioBottom >= 0) { // Bio est encore visible
                    horizontalMenu.classList.remove('show');
                }
            });
        });
    }

});
