import { useGSAP } from "@gsap/react";
import PinGroup from "./pin-group";
import gsap from "gsap";

export default function AboutContainer() {
  useGSAP(() => {
    function animatePinGroup(value: unknown, index: number, delay: number) {
      if (!(value instanceof SVGPathElement)) return;
      gsap.set(".pin-group>path", { x: 2000, transformOrigin: "bottom" });
      gsap.set(".pin-group-2>path", { x: -2000, transformOrigin: "bottom" });
      gsap
        .timeline({ delay: index * 0.2 + delay, ease: "power1.inOut" })
        .to(value, {
          x: 0,
          duration: 1,
        });
      gsap
        .timeline({ delay: index * 0.2 + delay, ease: "power1.in", repeat: -1 })
        .to(value, {
          rotate: -10,
          stagger: 0.1,
        })
        .to(value, {
          rotate: 10,
          stagger: 0.1,
        })
        .to(value, {
          rotate: 0,
          stagger: 0.1,
        });
    }
    gsap.utils
      .toArray(".pin-group>path")
      .forEach((value, index) => animatePinGroup(value, index, 2));
    gsap.utils
      .toArray(".pin-group-2>path")
      .reverse()
      .forEach((value, index) => animatePinGroup(value, index, 4));
  });

  return (
    <div className="font-family-primary relative">
      <div className="border-yellow about-container absolute top-0 left-0 m-32 flex flex-nowrap items-center gap-32 rounded-tr-[100px] rounded-br-[200px] rounded-bl-[60px] border-8 p-16">
        <PinGroup className="pin-group absolute -top-[153px] -left-[9px] overflow-visible" />
        <PinGroup className="pin-group-2 absolute -bottom-[153px] left-[900px] rotate-180 overflow-visible" />
        <div className="flex shrink-0 flex-col gap-4">
          <div className="text-green text-7xl font-black">
            ALEXSANDER <span className="text-yellow">SOUZA</span>
          </div>
          <div className="text-yellow -mt-6 flex items-center gap-2 text-xl font-bold">
            CREATIVE DEVELOPER.{" "}
            <span className="text-green flex items-center gap-2">
              PROUDLY BRAZILIAN <img src="brazil.png" className="size-10" />
            </span>
          </div>
        </div>
        <div className="bg-yellow size-96 shrink-0">IMAGE PLACEHOLDER</div>
        <p className="text-cyan w-[700px] text-3xl font-black">
          I'M PASSIONATE WITH BEAUTIFUL APPS, BEAUTIFUL CODE, MUSIC COMPOSITION,
          NATURE, FINAL FANTASY, AND MODERN/CONTEMPORARY ART.
        </p>
        <p className="w-[700px] text-3xl font-black text-white">
          I'LL BE ALWAYS A VERY SOCIAL AND FRIENDLY HUMAN BEING, AND I'D LOVE TO
          HEAR YOUR STORY!
        </p>
      </div>
    </div>
  );
}
