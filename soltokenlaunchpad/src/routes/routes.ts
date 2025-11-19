import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import LandingPage from "../pages/landingPage.tsx";
import CreatePage from "../pages/createPage.tsx";

const Routing = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: LandingPage
      },
      {
        path: "createtoken",
        Component: CreatePage,
      }
    ]
  }

])

export { Routing };
