import {
  Route,
  BrowserRouter as Router,
  Link,
  Routes as R
} from "react-router-dom";
import Register from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../Notfound/NotFound";
import Edit from "../Dashboard/Edit";
const Routes = (props) => {
  return (
    <Router {...props}>
  
      <R>
        
        <Route path="/register" element={<Register />} />
      
        <Route exact path="/" element={<Dashboard />} />
         <Route path={`/edit/:id`}   element={<Edit />}/> 

        <Route path="*" element={<NotFound />} />
      </R>
    </Router>
  );
};
export default Routes;
