import gsap, { Power3 } from "gsap";
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

let blurries = document.querySelectorAll(".blurry")
blurries.forEach((blurred) => {
  let clutter = "";
  let texts = blurred.innerHTML
  texts.split(" ").forEach((e) => {

    clutter += `<span class="inline-block  overflow-hidden"><span class="race-cont-span blur-sm inline-block relative translate-y-[200%]"> <span class="inline-block  blurry-text">${e}&nbsp;</span> </span></span>`
  })
  console.log(clutter)
  blurred.innerHTML = clutter
})


let Scale = (window.innerWidth < 600) ? 3 : 4;
let TranlateY = (window.innerWidth < 600) ? 600 : 1000;
const IMAGE_COUNT = 20;
const RADIUS = (window.innerWidth < 600) ? 180 : 240;
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
  img.className = "absolute h-14 w-10 rounded-md ";

  img.style.zIndex = z
  contant.appendChild(img);
  console.log(rotation)
  z--
  let ll = gsap.timeline({
    onComplete: () => {
      loaded++;

      if (loaded === IMAGE_COUNT) {
        let xyz = gsap.timeline()
        xyz.to(".race-cont",{
          y:`0`,
          scale:1,
          stagger:0.07,
          ease:"power2.out"
        })
        xyz.to(".race-cont-span",{
          y:`0`,
          scale:1,
          stagger:0.015,
          filter:`blur(0px)`,
          ease:"power3.out"
        })
        document.querySelector(".tt").style.opacity = 1
        document.body.style.overflow = "unset"
        document.querySelector("html").style.overflow = "unset"
        createScrollAnimation();

      }
    }
  })
  ll.set(img, {
    rotateY: -180
  })
  ll.to(img, {
    duration: 0.3,
    rotate: rotation,
    ease: "none",
    x: posX / 2,
    y: posY / 2,
    delay: i * 0.05 + 1,

  });
  ll.to(img, {
    x: posX,
    rotateY: 0,
    y: posY,
    duration: 0.5,
    // delay:0.5
  })
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
  tl.to(".yy,.race,.helmet", {
    y: `-100%`,
    duration: 0.1
  }, "a")
  tl.to(".blurry-text", {
    y: `-100%`,
    // filter:`blur(3px)`,
    duration: 0.1,
    stagger: 0.007,
    // opacity:0
  }, "a")
  tl.to("img", {
    rotateY: 180,
    rotateX: 360,
    duration: 0.65
  }, "a")
  tl.to(".contant", {
    scale: Scale,
    rotate: -252,
    y: TranlateY,
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




