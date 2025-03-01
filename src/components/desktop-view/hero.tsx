import ClickMe from "../click-me";
import Logo from "../logo";

export default function Hero() {
  return (
    <div className="bg-yellow flex min-h-screen flex-col">
      <Logo />
      <ClickMe />
    </div>
  );
}
