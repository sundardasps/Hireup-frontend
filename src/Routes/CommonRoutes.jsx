
import { Route, Routes, } from 'react-router-dom';
import LandingPage from '../Pages/CommonPages/LandingPage'


function CommonRoutes() {
  return (
   
        <Routes>
            <Route path=''  element={<LandingPage/>} />
        </Routes>
   
  )
}

export default CommonRoutes
