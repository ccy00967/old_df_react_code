import './App.css';
import { HomePage } from './pages/home/HomePage';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { ServicePage } from './pages/myinfo/ServicePage';
import { RegisterPage } from './pages/register/RegisterPage';
import { CustomAppBar } from './components/CustomAppBar';
import { RequestFormPage } from './pages/requestform/RequestFormPage';
import { DetailedPage } from './pages/postedrequest/DetailedPage';
import { IntroductionPage } from './pages/home/IntroductionPage';


function App() {
  return (
    <div className="App">
      <CustomAppBar/>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/service" element={<ServicePage />}></Route>
      <Route path="/requestform" element={<RequestFormPage />}></Route>
      <Route path="/detail" element={<DetailedPage />}></Route>
      <Route path="/introduction" element={<IntroductionPage />}></Route>
    </Routes>
  </div>
  );
}

export default App;
