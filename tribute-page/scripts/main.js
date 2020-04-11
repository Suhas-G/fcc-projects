function fadeIn(element, duration) {
    (function increment(value = 0) {
        element.style.opacity = String(value);
        if (element.style.opacity !== '1') {
            setTimeout(() => {
                increment(value + 0.1);
            }, duration / 10);
        }
    })();
};

function fadeOut(element, duration) {
    (function decrement() {
        (element.style.opacity -= 0.1) < 0 ? element.style.display = 'none' : setTimeout(() => {
            decrement();
        }, duration / 10);
    })();
};

function _hideElement(element){
    element.style.display = "none";
}

function _showElement(element, display){
    element.style.display = display || "initial";
}

function _normalise(words){
    return words.replace(/\n/g, " ");
}

function showFloatingButton(){
    const menuButton = document.getElementById("mobile-menu");
    const homeButton = document.getElementById("mobile-home");
    const booksButton = document.getElementById("mobile-books");
    const achievementsButton = document.getElementById("mobile-achievements");
    if (menuButton){
        const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const y = window.scrollY;
        if (y < vh/2){
            _hideElement(menuButton);
            _hideMenuButton(homeButton);
            _hideMenuButton(booksButton);
            _hideMenuButton(achievementsButton);
        } else {
            _showElement(menuButton);
        }
    }
}

function scrollToContent(){
    const content = document.getElementById("content");
    content.scrollIntoView({behavior: "smooth"});
}


function toggleMenuButtons(event){
    event.stopPropagation();
    const homeButton = document.getElementById("mobile-home");
    const booksButton = document.getElementById("mobile-books");
    const achievementsButton = document.getElementById("mobile-achievements");

    if (homeButton.getAttribute("data-shown") === "true"){
        _hideMenuButton(achievementsButton, 200);
        _hideMenuButton(booksButton, 300);
        _hideMenuButton(homeButton, 400);
    } else {
        _showMenuButton(homeButton, 200);
        _showMenuButton(booksButton, 300);
        _showMenuButton(achievementsButton, 400);
    }

}


function hideAllMenuButtons(event) {
    const homeButton = document.getElementById("mobile-home");
    if (homeButton.getAttribute("data-shown") === "true"){
        toggleMenuButtons(event);
    }
}


function _hideMenuButton(button, duration){
    button.setAttribute("data-shown", "false");
    if (duration){
        fadeOut(button, duration);
    } else {
        _hideElement(button);
    }
}


function _showMenuButton(button, duration){
    button.setAttribute("data-shown", "true");
    _showElement(button);
    if (duration){
        fadeIn(button, duration);
    }
}

function showSection(sectionName, event){
    const sections = document.getElementsByClassName("section");

    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        if (section.id === sectionName){
            section.classList.remove("hidden");
            fadeIn(section, 200)
        } else {
            section.classList.add("hidden")
        }
    }
    toggleMenuButtons(event);
}

function populateModal(img, title, details){

    if (img){
        const {src, alt} = img;
        const imgDom = document.getElementById("modal-figure");
        imgDom.setAttribute("src", src);
        imgDom.setAttribute("alt", alt);
    }
    const titleDom = document.getElementById("modal-heading");
    const detailsDom = document.getElementById("modal-details");

    titleDom.innerText = title;
    detailsDom.innerText = details;
}

function showModal(event){
    const award = event.currentTarget;
    const modal = document.getElementById("modal");
    const imgDom = award.getElementsByTagName("img")[0];
    const img = {
        "src": imgDom.getAttribute("src"),
        "alt": imgDom.getAttribute("alt")
    }
    const title = _normalise(award.getElementsByClassName("award-title")[0].innerText);
    const details = _normalise(award.getElementsByClassName("award-description")[0].innerText);
    populateModal(img, title, details);
    _showElement(modal);
    fadeIn(modal, 100);
}

function closeModal(event){
    const modal = document.getElementById("modal");
    if (event.target === event.currentTarget){
        fadeOut(modal, 100);
    }
}

function showReferences(){
    const references = document.getElementById("references").cloneNode(true);
    references.id = "";
    if (!references){
        return
    }
    const modal = document.getElementById("modal");
    const titleDom = document.getElementById("modal-heading");
    titleDom.innerText = "References"
    const detailsDom = document.getElementById("modal-details");
    detailsDom.appendChild(references);
    _showElement(modal);
    fadeIn(modal, 100);
}



window.addEventListener("scroll", showFloatingButton)
document.getElementById("scroll-down").addEventListener("click", scrollToContent);
document.getElementById("mobile-menu").addEventListener("click", toggleMenuButtons);
document.getElementById("mobile-home").addEventListener("click", showSection.bind(this, "home"));
document.getElementById("mobile-books").addEventListener("click", showSection.bind(this, "books"));
document.getElementById("mobile-achievements").addEventListener("click", showSection.bind(this, "achievements"));
const triggers = document.getElementsByClassName("award")
for (let index = 0; index < triggers.length; index++) {
    const trigger = triggers[index];
    trigger.addEventListener("click", showModal);
}
document.getElementById("modal").addEventListener("click", closeModal)
document.getElementById("content").addEventListener("click", hideAllMenuButtons);
document.getElementById("disclaimer").addEventListener("click", showReferences);