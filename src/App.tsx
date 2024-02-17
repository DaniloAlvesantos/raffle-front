import { Outlet } from "react-router-dom";
import { NavBar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer/footer";

function App() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b from-[#4b0007] to-zinc-900 text-zinc-100 scroll-smooth flex-1">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
