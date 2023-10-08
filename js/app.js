/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.getElementsByClassName('landing__container'); //array of the sections
let sectionCounter = sections.length; //total number of sections in HTML
const mainSection = document.querySelector('main'); //main section in HTML
const fragmentSections = document.createDocumentFragment();  //fragment to build the new sections
const fragmentNav = document.createDocumentFragment(); //fragment to build menu
const navUl = document.getElementById('navbar__list'); //navigation menu
const sectionContent = [
    {
        sectionContentHeading: `Section`,
        sectionContentBody: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>`
    },
    {
        sectionContentHeading: `Section`,
        sectionContentBody: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>`
    },

];

// building new sections
for (const content of sectionContent) {
    sectionCounter++;
    const newSection = document.createElement('section');
    const newDiv = document.createElement('div');
    newSection.id = 'section' + sectionCounter;
    newSection.dataset.nav = 'Section ' + sectionCounter;
    newDiv.classList.add('landing__container');
    newSection.appendChild(newDiv);
    newDiv.innerHTML = `<h2>${content.sectionContentHeading} ${sectionCounter}</h2>${content.sectionContentBody}`;
    fragmentSections.appendChild(newSection);
}

mainSection.appendChild(fragmentSections);

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

for (const section of sections) {
    const newListItem = document.createElement('li');
    const newAnchor = document.createElement('a');
    const sectionId = section.parentElement.id;
    const sectionNav = section.parentElement.dataset.nav;
    newAnchor.classList.add('menu__link');
    newAnchor.dataset.block = sectionId;
    newAnchor.href = '#' + sectionId;
    newAnchor.textContent = sectionNav;
    newListItem.appendChild(newAnchor);
    fragmentNav.appendChild(newListItem);
}
navUl.appendChild(fragmentNav);


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event

function scrollToSection(event) {
    const target = event.target;
    if (target.classList.contains('menu__link')) {
        event.preventDefault();
        const element = target.dataset.block;
        document.getElementById(element).scrollIntoView({ behavior: "smooth" });
    }
}

navUl.addEventListener('click', scrollToSection);
/**
 * End Main Functions
 * Begin Events
*/

// Build menu 

// Scroll to section on link click

// Set sections as active

//Credit to the tip from Udacity's Project Development Strategy + a session lead's walktrhough for getting the makeActive() function started

function makeActive() {
    const navLinks = document.querySelectorAll('[data-block]');
    for (const section of sections) {
        const bounds = section.getBoundingClientRect();
        const isInViewport = bounds.top <= (window.innerHeight * 0.5) && bounds.bottom > (window.innerHeight * 0.5);
        if (isInViewport) {
            //apply active state on current section and corresponding Nav link
            section.parentElement.classList.add('your-active-class');
            for (const navLink of navLinks) {
                if (navLink.dataset.block === section.parentElement.id) {
                    navLink.classList.add('active');
                }
            }

        } else {
            //Remove active state from other section and corresponding Nav link
            section.parentElement.classList.remove('your-active-class');
            const listElement = document.querySelectorAll('[data-block]');
            for (const navLink of listElement) {
                if (navLink.dataset.block === section.parentElement.id) {
                    navLink.classList.remove('active');
                }
            }
        }
    }
}

window.addEventListener('scroll', makeActive);
