import './App.css';
import { Route, Routes } from 'react-router-dom';
import WelcomeComponent from './components/Welcome/WelcomeComponent';
import LogInComponent from './components/LogIn/LogInComponent';
import RegisterComponent from './components/Register/RegisterComponent';
import PrivateRoute from './utils/privateRoute';
import SongListComponent from './components/Song/SongListComponent';
import AuthenticatedComponent from './components/Authenticated/AuthenticatedComponent';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
          <Routes>
            <Route path='/' element={<WelcomeComponent />}/>
            <Route path='/login' element={<LogInComponent />}/>
            <Route path='/register' element={<RegisterComponent />} />
            <Route path='/songs' element={
                <PrivateRoute>
                    <SongListComponent />
                </PrivateRoute>
            } />
             <Route path='/authenticated' element={
                <PrivateRoute>
                    <AuthenticatedComponent />
                </PrivateRoute>
            } />
          </Routes>
  );
}

export default App;
