import './App.css';
import { Route, Routes } from 'react-router-dom';
import WelcomeComponent from './components/Welcome/WelcomeComponent';
import LogInComponent from './components/LogIn/LogInComponent';
import RegisterComponent from './components/RegisterDef/RegisterDefComponent';
import PrivateRoute from './utils/privateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocalState } from './utils/useLocalStorage';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import DefaultDashboardComponent from './components/DefaultDashboard/DefaultDashboardComponent';
import AdminDashboardComponent from './components/AdminDashboard/AdminDashboardComponent';
import PerformerDashboardComponent from './components/PerformerDashboard/PerformerDashboardComponent';
import RegisterDefComponent from './components/RegisterDef/RegisterDefComponent';
import RegisterPerfComponent from './components/RegisterPerf/RegisterPerfComponent';
import { RedirectToDashboard } from './utils/redirectToDashboard';


function App() {
  const [jwt,setJwt] = useLocalState("","jwt");
  const [roles,setRoles] = useState(getRolesFromJwt());

  function getRolesFromJwt(){
    if(jwt) {
      const decJwt = jwtDecode(jwt);
      return decJwt.authorities;
    }
    return [];
  }


  return (
          <Routes>
            <Route path='/' element={!jwt ? (<LogInComponent />) : (<RedirectToDashboard />)}/>
            <Route path='/login' element={<LogInComponent />}/>
            <Route path='/registerDefault' element={<RegisterDefComponent />} />
            <Route path='/registerPerformer' element={<RegisterPerfComponent />} />
            <Route path='/dashboard'
                  element={roles.find((r)=>r === "ROLE_DEFAULT")? ( 
                  <PrivateRoute>
                    <DefaultDashboardComponent />
                </PrivateRoute>) : roles.find(r => r === "ROLE_ADMIN") ? (
                  <PrivateRoute>
                    <AdminDashboardComponent/>
                  </PrivateRoute>
                ) : (<PrivateRoute>
                  <PerformerDashboardComponent />
                </PrivateRoute>)
               
            } />
          </Routes>
  );
}

export default App;
