import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ✅ Initialize Lenis
const lenis = new Lenis({
  smooth: true,
  lerp: 0.1,
  direction: "vertical"
});

// ✅ Connect Lenis with GSAP's ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value, { immediate: true });
    } else {
      return window.scrollY;
    }
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.body.style.transform ? "transform" : "fixed",
});

// ✅ Lenis animation loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --------------------------------------------
// ⬇️ Your existing GSAP + image circle logic
// --------------------------------------------

const IMAGE_COUNT = 20;
const RADIUS = 240;
const ROTATE_PER_IMAGE = 360 / IMAGE_COUNT;
const images = Array.from({ length: IMAGE_COUNT }, (_, i) => `/img${i + 1}.jpg`);
let z = images.length + 20
const contant = document.querySelector(".contant");
let loaded = 0;
images.forEach((src, i) => {
  const angle = (i / IMAGE_COUNT) * Math.PI * 2;
  const posX = Math.cos(angle) * RADIUS;
  const posY = Math.sin(angle) * RADIUS;
  const rotation = (ROTATE_PER_IMAGE * i) + 90;
  const img = document.createElement("img");
  console.log(angle)
  img.src = src;
  img.className = "absolute h-14 w-10 rounded-md";
  img.style.zIndex = z
  contant.appendChild(img);

  z--


  gsap.to(img, {
    x: posX,
    y: posY,
    delay: i * 0.05 + 0.5,
    rotate: rotation,
    duration: 0.8,
    onComplete: () => {
      loaded++;
      if (loaded === IMAGE_COUNT) {
        document.querySelector(".tt").style.opacity = 1
        document.body.style.overflow = "unset"
        document.querySelector("html").style.overflow = "unset"
        createScrollAnimation();

      }
    }
  });
});

// 🔁 Scroll-triggered animation with Lenis support
function createScrollAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "main",
      scroller: document.body, // important for Lenis
      start: "top top",
      end: "+=4000",
      pin: true,
      scrub: true,
      // markers: true
    }
  });
  tl.to(".yy", {
    y: `-100%`,
    duration: 0.1
  }, "a")
  tl.to("img", {
    rotateY: 180,
    rotateX: 360,
    duration: 0.65
  }, "a")
  tl.to(".contant", {
    scale: 4,
    rotate: -252,
    y: 1000,
    ease: "none",
    duration: 0.65
  }, "a")

  tl.to(".contant", {
    rotate: -360,
    ease: "none",
    duration: 0.3
  });

  // ✅ Refresh ScrollTrigger after everything is ready
  ScrollTrigger.refresh();
}




const setVH = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', ` ${vh}px`);
};
setVH();
window.addEventListener('resize', setVH);


console.log(Math.PI)