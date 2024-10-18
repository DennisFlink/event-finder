import { Outlet } from "react-router";
import Header from "./components/Header";
import CreateEventForm from "./components/CreateEventForm";

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
