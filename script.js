window.addEventListener("scroll", function () {
    if (window.innerWidth > 768) {
    let nav = document.querySelector("nav");

    let scrollY = window.scrollY;

    let maxScroll = 200;

    let opacity = Math.min(scrollY / maxScroll, 1);

    nav.style.background = `rgba(10, 15, 30, ${0.3 + opacity * 0.6})`;
   
    nav.style.backdropFilter = `blur(${10 + opacity * 10}px)`;
    }
});

const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // يمنع فتح صفحة Formspree

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
            form.reset(); // يمسح الفورم بعد الإرسال

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

// فتح وقفل القائمة عند الضغط على الأيقونة
menuIcon.addEventListener("click", (e) => {
    e.stopPropagation(); // يمنع انتشار الحدث عشان القائمة متقفلش فوراً
    navLinks.classList.toggle("active");
    
    // تغيير شكل الأيقونة من bars لـ X
    const icon = menuIcon.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
});

// وظيفة لقفل المنيو عند الضغط على اللينكات
function closeMenu() {
    navLinks.classList.remove("active");
    const icon = menuIcon.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
}

// قفل المنيو عند الضغط في أي مكان في الشاشة
document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
        closeMenu();
    }
});

// كود الـ Scroll بتاعك زي ما هو مش هيتأثر
window.addEventListener("scroll", function () {
    let nav = document.querySelector("nav");
    let scrollY = window.scrollY;
    let maxScroll = 200;
    let opacity = Math.min(scrollY / maxScroll, 1);
    nav.style.background = `rgba(10, 15, 30, ${0.3 + opacity * 0.6})`;
    nav.style.backdropFilter = `blur(${10 + opacity * 10}px)`;
});