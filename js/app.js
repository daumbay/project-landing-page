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
// Stores the list of sections in the HTML DOM
const nodeList = document.querySelectorAll("section");
// Stores the list of sections in the navbar
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

// Build the nav
function buildNavBar () {
    // Arrays to store the section names and section ids
    const sections = [];
    const sectionIds = [];

    // Document Fragment to store the list item elements prior 
    // to appending to document
    const documentFragment = document.createDocumentFragment();

    // Extract the section name and id from nodeList and store
    // them in appropriate arrays
    for (let node of nodeList) {
        sections.push(node.dataset.nav);
        sectionIds.push("#" + node.id);
    }
    
    // De-structure the array to extract index numbers
    // Nest an anchor element within the list item element
    // Prepare the link using the appropriate section id
    // Add appropriate class to list item and append to
    // Document Fragment
    for (let [index, section] of sections.entries()) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = section;
        a.href = sectionIds[index];
        li.appendChild(a);
        li.classList.add("menu__link");
        documentFragment.appendChild(li);
    }

    // Append the final document fragment to navbar
    navBarList.appendChild(documentFragment);
}
// Add class 'active' to section when near top of viewport
function makeActive () {
    // De-structure the nodeList to extract indices
    for (const [index, section] of nodeList.entries()) {
        // Get the size of the bounding rectangle of each section
        const box = section.getBoundingClientRect();
        if (box.top <= 150 && box.bottom >= 150) {
            // Add active class to approprate section and navlink
            section.classList.add("your-active-class");
            navBarList.children[index].classList.add("isActive");
        } else {
            // Remove active class from other sections and navlinks
            section.classList.remove("your-active-class");
            navBarList.children[index].classList.remove("isActive");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToSection (event) {
    // Prevent default action of jumping to a link on click event
    event.preventDefault();
    // Select the appropriate section element using data-nav attribute
    const element = document.querySelector(`[data-nav="${event.target.innerText}"]`);
    // Smoothly scroll to the correct section
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

