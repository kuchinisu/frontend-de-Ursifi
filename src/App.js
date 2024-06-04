import store from "./store";

import { Provider } from "react-redux";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error404 from "./containers/err/Error404";
import Home from "./containers/pages/Home";
import Login from "./containers/pages/auth/Login";
import Carpeta from "./containers/pages/Carpeta";


function App() {
  return (
    <div>
     <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Error404/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>

          <Route path="carpeta/:slug/:ubicacion/:nombre" element={<Carpeta/>}/>
        </Routes>
      </Router>
    </Provider>
    </div>
  );
}

export default App;