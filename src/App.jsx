import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import  CompanyRoutes from './Routes/CompanyRoutes'
import  UserRoutes from './Routes/UserRoutes'
import  AdminRoutes from './Routes/AdminRoutes'
import LandingPage from './Pages/commonPages/LandingPage';
import ErrorComponent from './Components/commonComponents/errorHandling/ErrorComponent'




function App() {

                  
  return (
     <Router>
      <Routes>
         <Route index path="/" element={<LandingPage/>}/>
         <Route path="/user/*" element={<UserRoutes/>}/>
         <Route path="/company/*" element={<CompanyRoutes/>}/>
         <Route path="/admin/*" element={<AdminRoutes/>}/>
         <Route path="*" element={<ErrorComponent/>}/>

      </Routes>
    </Router>
  )
}

export default App
