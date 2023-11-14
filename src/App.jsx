import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import  CompanyRoutes from './Routes/CompanyRoutes'
import  UserRoutes from './Routes/UserRoutes'
import  AdminRoutes from './Routes/AdminRoutes'
import LandingPage from './Pages/commonPages/LandingPage';




function App() {

  return (
     <Router>
      <Routes>
        
         <Route index path="/" element={<LandingPage/>}/>
         <Route path="/user/*" element={<UserRoutes/>}/>
         <Route path="/company/*" element={<CompanyRoutes/>}/>
         <Route path="/admin/*" element={<AdminRoutes/>}/>
   
      </Routes>
    </Router>
  )
}

export default App
