import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Form/Form";
import Data from "./Component_1/Data";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/component-1' element={<Data />} />
      </Routes>
    </Router>
  );
};

export default App;
