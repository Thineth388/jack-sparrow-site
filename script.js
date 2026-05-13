if(localStorage.getItem("loggedIn") !== "true") {
  // Allow login and register pages
  const path = window.location.pathname;
  if (!path.includes("login.html") && !path.includes("register.html")) {
    window.location.href = "login.html";
  }
}

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 1000);
    }, 1500);
  }
});

// Create and handle scroll to top button
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.createElement("div");
  scrollBtn.innerHTML = "&#8679;";
  scrollBtn.className = "scroll-to-top";
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });
});

window.addEventListener("scroll", () => {
  const nav = document.getElementById("main-nav");
  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      const path = window.location.pathname;
      if (path.includes("index.html") || path === "/" || path === "") {
        nav.classList.remove("scrolled");
      }
    }
  }
});

// Active nav link highlighting
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("#nav-links a");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});

// Hamburger menu toggle
function toggleMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.getElementById("nav-links");
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
}

function startExperience() {
  const music = document.getElementById("bg-music");
  if (music) {
    music.volume = 0.2; 
    music.play().catch(e => {
      console.log("Music play blocked by browser, try interacting with the page first:", e);
    });
  }
  
 
  const story = document.querySelector(".parchment-container");
  if(story) {
    story.scrollIntoView({ behavior: "smooth" });
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

const revealElements = () => {
  const reveals = document.querySelectorAll(".reveal");
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("load", () => {
  revealElements();
  
  const music = document.getElementById("bg-music");
  if (music && !window.location.pathname.includes("index.html")) {
    music.volume = 0.2;
    music.play().catch(() => {
      console.log("Autoplay blocked. User needs to interact with the page first.");
    });
  }
});

window.addEventListener("scroll", revealElements);
document.addEventListener("DOMContentLoaded", revealElements);