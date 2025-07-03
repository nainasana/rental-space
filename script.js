gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const heroWrapper = document.getElementById("heroWrapper");
  const heroBackground = document.querySelector(".hero-parallax-background");
  const featureBoxes = document.querySelectorAll(".feature-box");
  const parallaxHeroCard = document.getElementById("parallaxHeroCard");
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const heroCenterContent = document.querySelector(".hero-center-content");

  // Set initial state for feature boxes
  featureBoxes.forEach((box) => {
    gsap.set(box, { opacity: 0, y: -60 });
  });

  // Hero background shrink animation
  ScrollTrigger.create({
    trigger: ".hero-section",
    start: "top top",
    end: "bottom top",
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      if (heroBackground) {
        const startWidth = window.innerWidth;
        const startHeight = window.innerHeight;
        let endWidth, endHeight;

        if (startWidth < 600) {
          endWidth = Math.max(Math.min(startWidth * 0.85, 380), 180);
          endHeight = Math.max(Math.min(startHeight * 0.38, 300), 140);
        } else if (startWidth < 900) {
          endWidth = Math.max(Math.min(startWidth * 0.6, 420), 220);
          endHeight = Math.max(Math.min(startHeight * 0.6, 500), 200);
        } else {
          endWidth = 440;
          endHeight = Math.max(Math.min(startHeight * 0.7, 700), 320);
        }

        const width = startWidth - (startWidth - endWidth) * progress;
        const height = startHeight - (startHeight - endHeight) * progress;
        const borderRadius = 50 * progress;
        const left = `calc(50% - ${width / 2}px)`;
        const top = `calc(50% - ${height / 2}px)`;

        gsap.set(heroBackground, {
          width: width + "px",
          height: height + "px",
          borderRadius: `${borderRadius}px`,
          left: left,
          top: top,
          filter: `brightness(${0.85 + progress * 0.15})`,
        });
      }

      // Scroll indicator visibility
      if (scrollIndicator) {
        scrollIndicator.classList.toggle("hide", progress > 0.05);
      }

      // Fade out hero content at scroll end
      if (heroCenterContent) {
        gsap.to(heroCenterContent, {
          opacity: progress > 0.85 ? 0 : 1,
          duration: 0.3,
          pointerEvents: "none",
        });
      }

      // Feature boxes logic
      if (progress > 0.98 && progress <= 1.1) {
        featureBoxes.forEach((box, i) => {
          gsap.to(box, {
            opacity: 1,
            y: 0,
            delay: i * 0.18,
            pointerEvents: "auto",
            duration: 1.2,
            ease: "power2.out",
          });
        });
        body.classList.add("shrunk-hero");

        const msg = document.querySelector(".after-feature-message");
        if (msg) {
          gsap.to(msg, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => msg.classList.remove("active"),
          });
        }
      } else if (progress > 1.1) {
        featureBoxes.forEach((box) => {
          gsap.to(box, {
            opacity: 0,
            y: 60,
            pointerEvents: "none",
            duration: 0.7,
            ease: "power1.out",
          });
        });
        const msg = document.querySelector(".after-feature-message");
        if (msg) {
          msg.classList.add("active");
          gsap.to(msg, { opacity: 1, duration: 0.7 });
        }
      } else {
        featureBoxes.forEach((box) => {
          gsap.to(box, {
            opacity: 0,
            y: -60,
            pointerEvents: "none",
            duration: 0.5,
            ease: "power1.out",
          });
        });
        body.classList.remove("shrunk-hero");

        const msg = document.querySelector(".after-feature-message");
        if (msg) {
          gsap.to(msg, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => msg.classList.remove("active"),
          });
        }
      }
    },
  });

  // Wrapper shrink (scale + border radius)
  ScrollTrigger.create({
    trigger: ".hero-section",
    start: "top top",
    end: "bottom top",
    scrub: 1,
    onUpdate: (self) => {
      const scale = 1 - self.progress * 0.4;
      gsap.set(heroWrapper, {
        scale: scale,
        borderRadius: `${self.progress * 50}px`,
      });
    },
  });

  // Parallax card animation
  if (parallaxHeroCard) {
    ScrollTrigger.create({
      trigger: ".parallax-feature-section",
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(parallaxHeroCard, {
          scale: 0.8 + self.progress * 0.2,
          opacity: self.progress,
          y: self.progress * -30,
        });
      },
    });
  }

  // Mobile menu
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".main-navigation");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Parallax section moves upward as you scroll into the after-feature-section
  ScrollTrigger.create({
    trigger: '.after-feature-section',
    start: 'top bottom',
    end: 'top top',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const moveY = -window.innerHeight * progress;
      gsap.to('.hero-parallax-background', { y: moveY, duration: 0.1, overwrite: true });
      gsap.to('.hero-center-content', { y: moveY, duration: 0.1, overwrite: true });

      // Reverse animation for feature boxes: move away diagonally and fade out
      const spread = 200 * progress;
      const grow = 180 + 100 * progress;
      const fade = progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3; // 1 to 0 as progress goes 0.7 to 1

      gsap.to('.feature-box-1', { y: moveY - spread, x: +spread, height: grow, opacity: fade, duration: 0.1, overwrite: true });
      gsap.to('.feature-box-2', { y: moveY + spread, x: +spread, height: grow, opacity: fade, duration: 0.1, overwrite: true });
      gsap.to('.feature-box-3', { y: moveY - spread, x: -spread, height: grow, opacity: fade, duration: 0.1, overwrite: true });
      gsap.to('.feature-box-4', { y: moveY + spread, x: -spread, height: grow, opacity: fade, duration: 0.1, overwrite: true });

      gsap.to('.after-feature-message', { opacity: progress, duration: 0.1, overwrite: true });
    }
  });

  // Fade in logos when the section is in view
  const trustedGrid = document.querySelector('.trusted-logos-grid');
  if (trustedGrid) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            trustedGrid.classList.add('show-logos');
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(trustedGrid);
  }

  // Restore reveal for .reveal-hi-text and .popup-bubble using clip-path
  if (window.gsap && window.ScrollTrigger) {
    gsap.set('.reveal-hi-text', { clipPath: 'inset(0 0 100% 0)', opacity: 1 });
    gsap.set('.popup-bubble', { clipPath: 'inset(0 0 100% 0)', opacity: 0, scale: 0.95 });
    gsap.set('.trusted-companies-container', { opacity: 1 });
    ScrollTrigger.create({
      trigger: '.after-feature-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to('.reveal-hi-text', { clipPath: `inset(0 0 ${100 - 100 * progress}% 0)`, opacity: 1, duration: 0.1, overwrite: true });
        gsap.to('.trusted-companies-container', { opacity: 1 - progress, duration: 0.1, overwrite: true });
        ['.popup1', '.popup2', '.popup3', '.popup4'].forEach((selector, i) => {
          const delay = i * 0.12;
          const popupProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
          gsap.to(selector, {
            clipPath: `inset(0 0 ${100 - 100 * popupProgress}% 0)`,
            opacity: popupProgress > 0 ? 1 : 0,
            scale: popupProgress > 0 ? 1 : 0.95,
            duration: 0.2,
            overwrite: true
          });
        });
      }
    });
  }

  // Animate scroll images from bottom to center, one by one, only one visible at a time, after popups are fully revealed
  const images = document.querySelectorAll('.scroll-image');
  if (images.length) {
    gsap.set(images, { opacity: 0, y: '80vh' });
    // Wait for after-feature-section to be fully revealed
    ScrollTrigger.create({
      trigger: '.after-feature-section',
      start: 'top top',
      end: 'bottom top',
      onLeave: () => {
        // Now enable scroll image animation
        ScrollTrigger.create({
          trigger: '.scroll-images-section',
          start: 'top top',
          end: `+=${images.length * 100}vh`,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress * images.length;
            images.forEach((img, i) => {
              const rel = progress - i;
              // Animate each image in sequence
              if (rel >= 0 && rel < 1) {
                gsap.to(img, {
                  opacity: 1,
                  y: `${(1 - rel) * 80}vh`,
                  zIndex: 10 + i,
                  duration: 0.2,
                  overwrite: true
                });
              } else if (rel < 0) {
                gsap.to(img, {
                  opacity: 0,
                  y: '80vh',
                  zIndex: 10 + i,
                  duration: 0.2,
                  overwrite: true
                });
              } else {
                gsap.to(img, {
                  opacity: 1,
                  y: '0vh',
                  zIndex: 10 + i,
                  duration: 0.2,
                  overwrite: true
                });
              }
            });
          }
        });
      },
      once: true
    });
  }

  // Show images only after after-feature-section is out of view
  const scrollImagesInner = document.querySelector('.scroll-images-inner');
  if (scrollImagesInner) {
    ScrollTrigger.create({
      trigger: '.after-feature-section',
      start: 'bottom top',
      onEnter: () => scrollImagesInner.classList.add('show-images'),
      onLeaveBack: () => scrollImagesInner.classList.remove('show-images'),
      markers: false
    });
  }

  // Custom scroll-to-reveal for scroll-images-inner (one image per scroll, always stacking on top, then spread, then spread-far with text/buttons)
  (function() {
    const imagesInner = document.querySelector('.scroll-images-inner');
    const images = Array.from(document.querySelectorAll('.scroll-image'));
    const spreadBg = document.querySelector('.spread-bg');
    let currentIndex = -1;
    let isAnimating = false;
    let spreadActive = false;
    let spreadFarActive = false;
    let finalActive = false;
    let spreadComplete = false;

    // Spread positions for 5 images (close spread)
    const spread = [
      { x: -220, y: -80, z: 110 }, // left-up
      { x: -80, y: 0, z: 120 },   // left-mid
      { x: 80, y: 0, z: 130 },    // right-mid
      { x: 220, y: -80, z: 140 }, // right-up
      { x: 0, y: 80, z: 150 }     // center-down
    ];
    // Farther spread positions for 5 images (with more gap)
    const spreadFar = [
      { x: -520, y: 30, z: 110 },   // far left, slightly up
      { x: -260, y: -40, z: 120 }, // left, slightly down
      { x: 0, y: 10, z: 130 },     // center, slightly up
      { x: 260, y: -30, z: 140 },  // right, slightly down
      { x: 520, y: 40, z: 150 }    // far right, slightly up
    ];

    function showImage(idx) {
      if (images[idx]) {
        for (let j = 0; j < idx; j++) {
          images[j].style.zIndex = 100 + j;
        }
        images[idx].style.zIndex = 200 + idx;
        gsap.fromTo(images[idx],
          { opacity: 0, y: '80vh', x: 0 },
          { opacity: 1, y: '0vh', x: 0, duration: 0.7, ease: 'power3.out', onStart: () => images[idx].classList.add('show') }
        );
      }
    }
    function hideImage(idx) {
      if (images[idx]) {
        gsap.to(images[idx], {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            images[idx].classList.remove('show');
            images[idx].style.zIndex = 1;
            gsap.set(images[idx], { x: 0, y: 0 });
          }
        });
      }
    }
    function spreadImages(cb) {
      images.forEach((img, i) => {
        gsap.to(img, {
          x: spread[i].x,
          y: spread[i].y,
          zIndex: spread[i].z,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: i === images.length - 1 ? () => { spreadComplete = true; if (cb) cb(); } : null
        });
      });
      spreadActive = true;
    }
    function stackImages() {
      images.forEach((img, i) => {
        gsap.to(img, {
          x: 0,
          y: 0,
          zIndex: 200 + i,
          duration: 0.8,
          ease: 'power3.inOut'
        });
      });
      spreadActive = false;
      spreadFarActive = false;
      spreadComplete = false;
      if (spreadBg) spreadBg.classList.remove('active');
    }
    function spreadImagesFar() {
      images.forEach((img, i) => {
        gsap.to(img, {
          x: spreadFar[i].x,
          y: spreadFar[i].y,
          zIndex: spreadFar[i].z,
          duration: 0.8,
          ease: 'power3.inOut'
        });
      });
      if (spreadBg) spreadBg.classList.add('active');
      imagesInner.classList.add('spread-far');
      spreadFarActive = true;
    }
    function spreadImagesClose() {
      images.forEach((img, i) => {
        gsap.to(img, {
          x: spread[i].x,
          y: spread[i].y,
          zIndex: spread[i].z,
          duration: 0.8,
          ease: 'power3.inOut'
        });
      });
      if (spreadBg) spreadBg.classList.remove('active');
      imagesInner.classList.remove('spread-far');
      spreadFarActive = false;
    }

    function onWheel(e) {
      if (!imagesInner.classList.contains('show-images') || isAnimating) return;
      if (e.deltaY > 0 && currentIndex < images.length - 1 && !spreadActive && !spreadFarActive) {
        isAnimating = true;
        currentIndex++;
        showImage(currentIndex);
        setTimeout(() => { isAnimating = false; }, 800);
      } else if (e.deltaY < 0 && currentIndex > -1 && !spreadActive && !spreadFarActive) {
        isAnimating = true;
        hideImage(currentIndex);
        currentIndex--;
        setTimeout(() => { isAnimating = false; }, 600);
      } else if (e.deltaY > 0 && currentIndex === images.length - 1 && !spreadActive && !spreadFarActive) {
        // Spread images on extra scroll after last image
        isAnimating = true;
        spreadImages();
        setTimeout(() => { isAnimating = false; }, 900);
      } else if (e.deltaY > 0 && currentIndex === images.length - 1 && spreadActive && !spreadFarActive && spreadComplete) {
        // Spread images farther and fade in bg/text/buttons
        isAnimating = true;
        spreadImagesFar();
        setTimeout(() => { isAnimating = false; }, 900);
      } else if (e.deltaY < 0 && currentIndex === images.length - 1 && spreadActive && spreadFarActive) {
        // Bring images back to close spread and fade out bg/text/buttons
        isAnimating = true;
        spreadImagesClose();
        setTimeout(() => { isAnimating = false; }, 900);
      } else if (e.deltaY < 0 && currentIndex === images.length - 1 && spreadActive && !spreadFarActive) {
        // Stack images back if scrolling up from close spread
        isAnimating = true;
        stackImages();
        setTimeout(() => { isAnimating = false; }, 900);
      }
      // Prevent scrolling past last state
      if (spreadFarActive && e.deltaY > 0) {
        e.preventDefault();
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false });
  })();
});
