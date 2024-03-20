import { RouterProvider } from "react-router-dom";
import { newRouter } from "./Router";

function App() {
  return <RouterProvider router={newRouter} />;
}

export default App;
