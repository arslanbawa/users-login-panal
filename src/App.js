import './App.css';
import Home from './Pages/Home/Home'
import LogIn from './Pages/LogIn/LogIn'
import Register from './Pages/Register/Register'
import DashBord from './Pages/Dashbord/Dashbord'
import Users from './Components/Users/Users'
import CreateWorkLogs from './Components/CreateWorkLogs/CreateWorkLogs'
import WorkLogs from './Pages/WorkLogs/WorkLogs'
import CreateUsers from './Components/CreateUsers/CreateUsers'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashbord" component={DashBord} />
          
          <Route exact path="/users/create" component={CreateUsers} />
          <Route exact path="/users/:id" component={CreateUsers} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/worklogs" component={WorkLogs} />
          <Route exact path="/createworklogs" component={CreateWorkLogs} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
