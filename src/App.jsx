import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import CustomerRouters from "./Custommer/Routers/CustomerRouters";


function App() {
  return (
    <>
      <Router>
        <CustomerRouters />
  
      </Router>
    </>
  );
}

export default App;
