import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import App from "../App";

const routing = createBrowserRouter([

  {
    path: '',
    Component: Layout,
    children: [{
      path: "",
      Component: App
    }]
  }
])

export default routing

