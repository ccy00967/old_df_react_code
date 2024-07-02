import './App.css';
import { HomePage } from './pages/home/HomePage';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { ServicePage } from './pages/mainservice/ServicePage';
import { RegisterPage } from './pages/login/RegisterPage';
import { CustomAppBar } from './components/CustomAppBar';
import { ServiceRequestPage } from './pages/mainservice/ServiceRequestPage';

function App() {
  return (
    <div className="App">
      <CustomAppBar/>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/service" element={<ServicePage />}></Route>
      <Route path="/requestform" element={<ServiceRequestPage />}></Route>
    </Routes>
  </div>
  );
}

export default App;
