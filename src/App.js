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
import SongDetails from './components/Song/SongDetailsComponent';
import LikedSongs from './components/Song/LikedSongsComponent';
import EditSong from './components/Song/EditSongComponent';
import NewSong from './components/Song/NewSongComponent';
import AdminAddUserComponent from './components/AdminDashboard/AdminAddUserComponent';
import UserDetail from './components/User/UserDetailComponent';


function App() {
  const [jwt,setJwt] = useLocalState("","jwt");
  const [role, setRole] = useLocalState("","role");
  const [roles,setRoles] = useState(getRolesFromLS());
 

  function getIdFromJwt(){
    if(jwt) {
      const decJwt = jwtDecode(jwt);
      return decJwt.id;
    }
    return [];
  }

  function getRolesFromLS(){
    if(role)return role;
  }


  return (
          <Routes>
            <Route path='/' element={!jwt ? (<LogInComponent />) : (<RedirectToDashboard />)}/>
            <Route path='/login' element={<LogInComponent />}/>
            <Route path='/registerDefault' element={<RegisterDefComponent />} />
            <Route path='/registerPerformer' element={<RegisterPerfComponent />} />
            <Route path='/dashboard'
                  element={(roles === "ROLE_DEFAULT")? ( 
                  <PrivateRoute>
                    <DefaultDashboardComponent />
                </PrivateRoute>) : (roles === "ROLE_ADMIN") ? (
                  <PrivateRoute>
                    <AdminDashboardComponent/>
                  </PrivateRoute>
                ) : (<PrivateRoute>
                  <PerformerDashboardComponent />
                </PrivateRoute>)
               
            } />
          <Route path='/song-details' element={
            <PrivateRoute>
              <SongDetails />
            </PrivateRoute>
          }/>
          <Route path='/likedsongs' element={
            <PrivateRoute>
              <LikedSongs />
            </PrivateRoute>
          } />
          <Route path='/song-edit' element={
            <PrivateRoute>
              <EditSong />
            </PrivateRoute>
          }
          />
          <Route path='/upload-song' element={
            <PrivateRoute>
              <NewSong />
            </PrivateRoute>
          } />
          <Route path='/add-user' element={
            <PrivateRoute>
              <AdminAddUserComponent />
            </PrivateRoute>
          } />
          <Route path='/user-detail' element={
            <PrivateRoute>
              <UserDetail />
            </PrivateRoute>
          } />
          </Routes>
  );
}

export default App;
