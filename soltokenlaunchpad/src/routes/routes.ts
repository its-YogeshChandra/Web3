import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import LandingPage from "../pages/landingPage.tsx";

const Routing = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: LandingPage
      }
    ]
  }


])

export { Routing };
