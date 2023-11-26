import './App.css';

import Dashboard from './Page/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserDetails from './Page/Dashboard/Details';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route exact path="/api/users/:userId"  element={<UserDetails />}  />
          {/* <Route path='/register' element={<Register />} /> */}
          {/* <Route path='/otp' element={<Otp />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;