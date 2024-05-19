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
const nodeList = document.querySelectorAll("section");
const navBarList = document.querySelector("#navbar__list");
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
function buildNavBar (event) {
    const sections = [];
    const sectionIds = [];
    const documentFragment = document.createDocumentFragment();

    for (let node of nodeList) {
        sections.push(node.dataset.nav);
        sectionIds.push("#" + node.id);
    }
    
    for (let [index, section] of sections.entries()) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = section;
        a.href = sectionIds[index];
        li.appendChild(a);
        li.classList.add("menu__link");
        documentFragment.appendChild(li);
    }
    navBarList.appendChild(documentFragment);
}
// Add class 'active' to section when near top of viewport
function makeActive (event) {
    for (const [index, section] of nodeList.entries()) {
        const box = section.getBoundingClientRect();
        if (box.top <= 150 && box.bottom >= 150) {
            section.classList.add("your-active-class");
            navBarList.children[index].classList.add("isActive");
        } else {
            section.classList.remove("your-active-class");
            navBarList.children[index].classList.remove("isActive");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToSection (event) {
    event.preventDefault();
    const element = document.querySelector(`[data-nav="${event.target.innerText}"]`);
    element.scrollIntoView({behavior: "smooth"});
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener("DOMContentLoaded", buildNavBar);
// Scroll to section on link click
navBarList.addEventListener("click", scrollToSection);
// Set sections as active
document.addEventListener("scroll", makeActive);

