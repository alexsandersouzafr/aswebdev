import gsap from "gsap";

export default function animateAbout() {
    gsap.set(".about-container", { xPercent: 100, opacity: 0 });
    gsap.set(".title", { y: -200, opacity: 0 });

    gsap.to(".title", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
    });

    gsap.to(".about-container", {
        xPercent: 10,
        duration: 2,
        opacity: 1,
        ease: "power1.out",
        onComplete: () => {
            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: ".about",
                        scrub: true,
                        pin: true,
                        end: "+=8000",
                        // markers: true,
                    },
                })
                .to(".about-container", { xPercent: -40 });
        },
    });
}