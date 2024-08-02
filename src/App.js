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
import { RequestsPage } from './pages/requests/RequestsPage';
import { TossPaymentsPage } from './components/tosspayments/TossPaymentsPage';
import { PaymentSuccessPage } from './components/tosspayments/PaymentSuccessPage';
import { PaymentFailPage } from './components/tosspayments/PaymentFailPage';


function App() {
  return (
    <div className="App">
      <CustomAppBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/service" element={<ServicePage />}></Route>
        <Route path="/requestform" element={<RequestFormPage />}></Route>
        <Route path="/detail" element={<DetailedPage />}></Route>
        <Route path="/introduction" element={<IntroductionPage />}></Route>
        <Route path="/request" element={<RequestsPage />}></Route>
        <Route path="/payment" element={<TossPaymentsPage />}></Route>
        <Route path="/payment/success" element={<PaymentSuccessPage />}></Route>
        <Route path="/payment/fail" element={<PaymentFailPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
