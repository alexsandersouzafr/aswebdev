import gsap from "gsap";

export default function animateClickMeButton(arrowRef: React.RefObject<SVGSVGElement | null>, divRef: React.RefObject<HTMLDivElement | null>, mousePosition: { x: number, y: number }, previousAngle: React.RefObject<number>, isHovering: boolean) {
    if (!divRef.current || !arrowRef.current) return;

    const circleBoundingRect = divRef.current.getBoundingClientRect();
    const circleCenter = {
        x: circleBoundingRect.left + circleBoundingRect.width / 2,
        y: circleBoundingRect.top + circleBoundingRect.height / 2,
    };

    let angle =
        Math.atan2(
            mousePosition.y - circleCenter.y,
            mousePosition.x - circleCenter.x,
        ) *
        (180 / Math.PI);

    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;

    const interpolatedAngle = gsap.utils.interpolate(
        previousAngle.current,
        angle,
        0.2,
    );

    previousAngle.current = interpolatedAngle;

    const radius = circleBoundingRect.width / 2.5;
    const x = radius * Math.cos(interpolatedAngle * (Math.PI / 180));
    const y = radius * Math.sin(interpolatedAngle * (Math.PI / 180));

    if (isHovering) {
        gsap.set(arrowRef.current, {
            opacity: 0,
            duration: 1,
        });
        gsap.set(".phantom", {
            opacity: 0,
            duration: 1,
            stagger: 0.1,
        });
    }

    if (!isHovering) {
        gsap.set(arrowRef.current, {
            opacity: 1,
            duration: 1,
        });

        gsap.to(arrowRef.current, {
            rotation: interpolatedAngle + 90,
            x: x,
            y: y,
            ease: "power1.out",
            duration: 0.1,
        });

        gsap.fromTo(
            ".phantom",
            { opacity: 0.3 },
            {
                rotation: interpolatedAngle + 90,
                x: x,
                y: y,
                ease: "power1.out",
                duration: 0.1,
                stagger: 0.1,
                opacity: 0,
            },
        );
    }
}