import './App.css';
import { HomePage } from './pages/home/HomePage';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { ServicePage } from './pages/mainservice/ServicePage';
import { RegisterPage } from './pages/login/RegisterPage';
import { CustomAppBar } from './components/CustomAppBar';
import { ServiceRequestPage } from './pages/mainservice/ServiceRequestPage';
import { DetailedPage } from './pages/mainservice/DetailedPage';
import { IntroductionPage } from './pages/home/IntroductionPage';
import { ContactPage } from './pages/mainservice/Contact';
import { ForgotPassword } from './pages/login/ForgotPassword';


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
      <Route path="/detail" element={<DetailedPage />}></Route>
      <Route path="/introduction" element={<IntroductionPage />}></Route>
      <Route path="/forgot" element={<ForgotPassword />}></Route>
      {/* <Route path="/contact" element={<ContactPage />}></Route> */}
    </Routes>
  </div>
  );
}

export default App;
