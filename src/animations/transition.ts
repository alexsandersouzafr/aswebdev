import gsap from "gsap";

export default function transition(setOpen: (open: boolean) => void) {
    gsap.to(".button-text", {
        opacity: 0,
        duration: 0.3,
        ease: "power1.out",
    });
    gsap.to(".click-me-button", {
        scale: 10,
        duration: 2,
        ease: "power3.in",
        onComplete: () => {
            setOpen(true);
        },
    });
}
