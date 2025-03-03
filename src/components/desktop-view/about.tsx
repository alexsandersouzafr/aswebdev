import AboutTitle from "../about-title";
import AboutContainer from "../about-container";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import animateAbout from "../../animations/about";

export default function About() {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    animateAbout();
  });

  return (
    <div className="bg-blue about relative m-0 min-h-screen overflow-hidden p-0">
      <AboutTitle />
      <AboutContainer />
    </div>
  );
}
