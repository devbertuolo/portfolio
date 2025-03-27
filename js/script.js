const checkbox = document.getElementById('chk');
const estiloLink = document.getElementById('style');
const logoLink = document.getElementById('logo-dev');
const logoLink2 = document.getElementById('logo-dev2');

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    estiloLink.href = './css/style-p2.css';
    logoLink.src = './imagens/logo2.png';
    logoLink2.src = './imagens/logo2.png';
  } else {
    estiloLink.href = './css/style-p1.css';
    logoLink.src = './imagens/logo.png';
    logoLink2.src = './imagens/logo.png';
  }
});

function scrollToElement(elementSelector, instance = 0){
    const elements = document.querySelectorAll(elementSelector);
    if (elements.length > instance){
        elements[instance].scrollIntoView({behavior: "smooth"});
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener("click", () => {
    scrollToElement(".header"); 
});
link2.addEventListener("click", () => {
    scrollToElement(".header", 2);
});
link3.addEventListener("click", () => {
    scrollToElement(".socials");
});