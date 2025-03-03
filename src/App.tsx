import { useState } from "react";
import Hero from "./components/desktop-view/hero";
import About from "./components/desktop-view/about";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="font-family-primary">
      {!open && <Hero setOpen={setOpen} />}
      {open && <About />}
    </div>
  );
}

export default App;
