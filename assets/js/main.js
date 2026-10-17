/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== HOME ENTRANCE ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false
});

sr.reveal('.home__data', {});
sr.reveal('.home__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });

/*===== CONTACT FORM =====*/
const contactForm = document.querySelector('.contact__form');
const contactStatus = document.getElementById('contact-status');

if (contactForm && contactStatus) {
    const submitButton = contactForm.querySelector('[type="submit"]');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (submitButton.disabled) return;

        submitButton.disabled = true;
        submitButton.value = 'Sending…';
        contactStatus.textContent = 'Sending your message…';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (response.ok) {
                contactStatus.textContent =
                    'Thanks! Your message was sent.';
                contactForm.reset();
            } else {
                contactStatus.textContent =
                    'Your message could not be sent. Please try again.';
            }
        } catch (error) {
            contactStatus.textContent =
                'Could not confirm your submission. Please check your connection before trying again.';
        } finally {
            submitButton.disabled = false;
            submitButton.value = 'Send Message';
        }
    });
}