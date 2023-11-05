import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import  CompanyRoutes from './Routes/CompanyRoutes'
import  UserRoutes from './Routes/UserRoutes'


function App() {

  return (
     <Router>
      <Routes>
         <Route path="/*" element={<UserRoutes/>}/>
         <Route path="/company/*" element={<CompanyRoutes/>}/>
      </Routes>
    </Router>
  )
}

export default App
