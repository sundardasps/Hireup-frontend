import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import  CompanyRoutes from './Routes/CompanyRoutes'
import  UserRoutes from './Routes/UserRoutes'
import  AdminRoutes from './Routes/AdminRoutes'


function App() {

  return (
     <Router>
      <Routes>
         <Route path="/*" element={<UserRoutes/>}/>
         <Route path="/company/*" element={<CompanyRoutes/>}/>
         <Route path="/admin/*" element={<AdminRoutes/>}/>
      </Routes>
    </Router>
  )
}

export default App
