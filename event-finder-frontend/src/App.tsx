import { Outlet } from "react-router";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div>hej</div>
      <Outlet />
    </>
  );
}

export default App;
