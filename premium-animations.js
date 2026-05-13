// GSAP ANIMATIONS
document.addEventListener("DOMContentLoaded", () => {
  // Ensure GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.log("GSAP not loaded. Skipping animations.");
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Hero Animations (Only if .hero-box exists)
  if (document.querySelector(".hero-box")) {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });
    tl.fromTo(".hero-box h2", 
      { y: 100, opacity: 0, scale: 0.8 }, 
      { y: 0, opacity: 1, scale: 1, duration: 2 }
    )
    .fromTo(".hero-box p", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1 }, 
      "-=1.5"
    )
    .fromTo(".btn-gold", 
      { y: 50, opacity: 0, scale: 0.8 }, 
      { y: 0, opacity: 1, scale: 1 }, 
      "-=1.3"
    );
  }

  // 2. Nav Bar Animation
  if (document.querySelector("nav")) {
    gsap.fromTo("nav", 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
    );
  }

  // 3. Parchment Box Parallax & Reveal
  if (document.querySelector(".parchment-box")) {
    gsap.fromTo(".parchment-box", 
      { y: 150, opacity: 0, rotationX: 15 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: ".parchment-container",
          start: "top 80%",
          end: "center center",
          scrub: 1
        }
      }
    );
  }

  // 4. Contact Section Elements Stagger
  if (document.querySelector(".reveal")) {
    gsap.fromTo(".reveal", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          toggleActions: "play none none none"
        }
      }
    );
  }

  // 5. Parallax effect on the waves
  if (document.querySelector(".parallax")) {
    gsap.to(".parallax", {
      x: "-50px",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Optional Custom Cursor
  createCustomCursor();
});

// CUSTOM CURSOR
function createCustomCursor() {
  const cursorHTML = `
    <div id="pirate-cursor"></div>
    <div id="pirate-cursor-follower"></div>
  `;
  document.body.insertAdjacentHTML('beforeend', cursorHTML);

  const cursor = document.getElementById('pirate-cursor');
  const follower = document.getElementById('pirate-cursor-follower');

  // Basic styling for cursor
  cursor.style.position = 'fixed';
  cursor.style.width = '10px';
  cursor.style.height = '10px';
  cursor.style.borderRadius = '50%';
  cursor.style.backgroundColor = '#ffd700';
  cursor.style.pointerEvents = 'none';
  cursor.style.zIndex = '999999';
  cursor.style.transform = 'translate(-50%, -50%)';
  cursor.style.transition = 'transform 0.1s ease';

  follower.style.position = 'fixed';
  follower.style.width = '30px';
  follower.style.height = '30px';
  follower.style.borderRadius = '50%';
  follower.style.border = '2px solid rgba(255, 215, 0, 0.5)';
  follower.style.pointerEvents = 'none';
  follower.style.zIndex = '999998';
  follower.style.transform = 'translate(-50%, -50%)';
  follower.style.transition = 'transform 0.2s ease, width 0.2s, height 0.2s';

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  });

  // Hover effect on interactable elements
  const interactables = document.querySelectorAll('a, button, input, textarea, .gallery-item, .movie-card');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0)';
      follower.style.width = '50px';
      follower.style.height = '50px';
      follower.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
      follower.style.border = '2px solid #ffd700';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.width = '30px';
      follower.style.height = '30px';
      follower.style.backgroundColor = 'transparent';
      follower.style.border = '2px solid rgba(255, 215, 0, 0.5)';
    });
  });

  // Hide default cursor
  document.body.style.cursor = 'none';
}
