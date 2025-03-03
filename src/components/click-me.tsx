import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import animateClickMeButton from "../animations/click-me-button";
import transition from "../animations/transition";

export default function ClickMe({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const previousAngle = useRef(0);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useGSAP(() => {
    animateClickMeButton(
      arrowRef,
      divRef,
      mousePosition,
      previousAngle,
      isHovering,
    );

    if (isClicked) {
      transition(setOpen);
    }
  }, [mousePosition, isHovering, isClicked]);

  return (
    <div
      ref={divRef}
      className="relative flex size-[700px] items-center justify-center"
    >
      <button
        className="bg-blue click-me-button text-md text-yellow z-10 flex size-[300px] cursor-pointer items-center justify-center rounded-full p-4 text-5xl font-black"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsClicked(true)}
      >
        <span className="button-text">CLICK ME</span>
      </button>
      <svg
        ref={arrowRef}
        width="48"
        height="197"
        viewBox="0 0 48 197"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue absolute"
      >
        <path d="M16.0134 8.0932C16.8336 -1.68153 31.1371 -1.68156 31.9573 8.09318L47.0736 188.237C47.4651 192.903 43.7838 196.906 39.1016 196.906H8.86907C4.18692 196.906 0.505564 192.903 0.897078 188.237L16.0134 8.0932Z" />
      </svg>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          width="48"
          height="197"
          viewBox="0 0 48 197"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="text-blue phantom absolute"
        >
          <path d="M16.0134 8.0932C16.8336 -1.68153 31.1371 -1.68156 31.9573 8.09318L47.0736 188.237C47.4651 192.903 43.7838 196.906 39.1016 196.906H8.86907C4.18692 196.906 0.505564 192.903 0.897078 188.237L16.0134 8.0932Z" />
        </svg>
      ))}
    </div>
  );
}
