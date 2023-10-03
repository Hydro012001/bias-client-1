import "./App.css";

import RoutePath from "../src/Routers/RoutePath";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RoutePath />
    </BrowserRouter>
  );
}

export default App;
