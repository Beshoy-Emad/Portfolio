window.addEventListener("scroll", function () {
    let navContainer = document.querySelector(".nav-container");
    if (window.scrollY > 50) {
        navContainer.style.padding = "14px 60px";
        navContainer.style.background = "rgba(15, 22, 32, 0.9)";
    } else {
        navContainer.style.padding = "17px 60px";
        navContainer.style.background = "rgba(22, 30, 41, 0.75)";
    }
});

const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            successMessage.style.display = "block";
            form.reset(); 

            setTimeout(() => {
                successMessage.style.display = "none";
            }, 4000);
        } else {
            alert("Something went wrong. Try again.");
        }

    } catch (error) {
        alert("Network error. Try again later.");
    }
});


const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", (e) => {
    e.stopPropagation(); 
    navLinks.classList.toggle("active");
    
    const icon = menuIcon.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
});

function closeMenu() {
    navLinks.classList.remove("active");
    const icon = menuIcon.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
}

document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
        closeMenu();
    }
});

const sections = document.querySelectorAll("section, .container");
const navLi = document.querySelectorAll("nav ul li");

window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((li) => {
        li.classList.remove("active");
        const a = li.querySelector("a");
        if (a && a.getAttribute("href") === `#${current}`) {
            li.classList.add("active");
        }
    });
});

const skillsSection = document.getElementById('skills');
const skillItems = document.querySelectorAll('.skill-item');
let hasAnimated = false; 

function animateSkills() {
    if (!skillsSection) return;
    
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight - 150;

    if (sectionPos < screenPos && !hasAnimated) {
        hasAnimated = true;

        skillItems.forEach(item => {
            const targetPercent = parseInt(item.getAttribute('data-percent'));
            const barFill = item.querySelector('.skill-bar-fill');
            
            if (barFill) {
                barFill.style.width = targetPercent + '%';
            }
        });
    }
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

const roles = [
    "Front-End Developer",
    "UI-Focused Developer",
    "Database Designer",
    "Data Analysis Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingText = document.getElementById("typing-text");

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();