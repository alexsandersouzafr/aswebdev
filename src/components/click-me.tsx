import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

export default function ClickMe() {
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const previousAngle = useRef(0); // Armazena o ângulo anterior para transição suave

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
    if (!divRef.current || !arrowRef.current) return;

    const circleBoundingRect = divRef.current.getBoundingClientRect();
    const circleCenter = {
      x: circleBoundingRect.left + circleBoundingRect.width / 2,
      y: circleBoundingRect.top + circleBoundingRect.height / 2,
    };

    // Cálculo do ângulo correto
    let angle =
      Math.atan2(
        mousePosition.y - circleCenter.y,
        mousePosition.x - circleCenter.x,
      ) *
      (180 / Math.PI);

    // Evita o problema de rotação completa ao cruzar o eixo
    const delta = angle - previousAngle.current;
    if (Math.abs(delta) > 180) {
      angle = previousAngle.current + (delta > 0 ? delta - 360 : delta + 360);
    }

    previousAngle.current = angle; // Atualiza o ângulo anterior

    // Define o raio da órbita
    const radius = circleBoundingRect.width / 3;

    // Calcula a posição relativa ao centro do círculo
    const x = radius * Math.cos(angle * (Math.PI / 180));
    const y = radius * Math.sin(angle * (Math.PI / 180));

    // Aplica a animação com GSAP
    gsap.to(arrowRef.current, {
      rotation: angle + 90,
      x: x,
      y: y,
      ease: "power1.out",
      duration: 0.2,
    });
  }, [mousePosition]);

  return (
    <div
      ref={divRef}
      className="relative flex size-[800px] items-center justify-center"
    >
      <div className="bg-blue text-yellow text-md z-10 flex size-[300px] items-center justify-center rounded-full p-4 text-5xl font-black">
        CLICK ME
      </div>
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
    </div>
  );
}
