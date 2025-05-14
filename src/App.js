import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login'; 
import HomePage from './Pages/Home';
import PatientScheduleForm from './Pages/PatientScheduleForm';
import PatientCancelForm from './Pages/PatientCancelForm';
import PatientRescheduleForm from './Pages/PatientRescheduleForm';
import DoctorView from './Pages/DoctorView';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/schedule" element={<PatientScheduleForm />}/>
        <Route path="/cancel" element={<PatientCancelForm />}/>
        <Route path="/reschedule" element={<PatientRescheduleForm />}/>
        <Route path="/doctor" element={<DoctorView />}/>
      </Routes>
    </Router>
  );
}


export default App;
