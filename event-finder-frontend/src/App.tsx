import { Outlet } from "react-router";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/toaster";
function App() {
  return (
    <>
      <Header />
      <div>hej</div>
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
