import ClickMe from "../click-me";
import Logo from "../logo";

export default function Hero({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  return (
    <div className="bg-yellow flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <Logo />
      <ClickMe setOpen={setOpen} />
    </div>
  );
}
