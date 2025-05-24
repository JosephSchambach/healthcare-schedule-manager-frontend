import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login'; 
import HomePage from './Pages/Home';
import PatientScheduleForm from './Pages/PatientScheduleForm';
import PatientCancelForm from './Pages/PatientCancelForm';
import PatientRescheduleForm from './Pages/PatientRescheduleForm';
import DoctorView from './Pages/DoctorView';
import { SessionProvider } from './Components/SessionContext';
import ProtectedRoute from './Components/ProtectedRoute';
import RegisterForm from './Pages/RegisterForm';

function App() {

  return (
    <SessionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/schedule" element={
              <ProtectedRoute requiredRole="patient">
                <PatientScheduleForm />
              </ProtectedRoute>
            }/>
            <Route path="/cancel" element={
              <ProtectedRoute requiredRole="patient">
                <PatientCancelForm />
              </ProtectedRoute>
            }/>
            <Route path="/reschedule" element={
              <ProtectedRoute requiredRole="patient">
                <PatientRescheduleForm />
              </ProtectedRoute>    
            }/>
            <Route path="/doctor" element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorView />
              </ProtectedRoute>  
            }/>
            <Route path="*" element={<h1>404 Page Not Found</h1>}/>
            <Route path="/register" element={
              <>
                <h1>Register Here</h1>
                <RegisterForm />
              </>
            }/>
        </Routes>
      </Router>
    </SessionProvider>
  );
}


export default App;
