import { useState } from "react";
import { NavBar } from "./components/NavBar.jsx";
import { Landing } from "./screens/Landing.jsx";
import { Verify } from "./screens/Verify.jsx";
import { Onboard } from "./screens/Onboard.jsx";
import { Dashboard } from "./screens/Dashboard.jsx";
import { Upgrade } from "./screens/Upgrade.jsx";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const go = (s) => { setScreen(s); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (<>
    {screen === "landing" && <Landing go={go} />}
    {screen === "verify" && <Verify go={go} />}
    {screen === "onboard" && <Onboard go={go} />}
    {screen === "dashboard" && <Dashboard go={go} />}
    {screen === "upgrade" && <Upgrade go={go} />}
    <NavBar screen={screen} go={go} />
  </>);
}
