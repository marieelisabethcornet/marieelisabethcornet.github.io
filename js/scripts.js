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

});
