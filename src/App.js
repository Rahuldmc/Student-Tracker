import './App.css';
import { createClient } from "@supabase/supabase-js";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Components/Login';
import Register from './Components/Register';
import StudentDashoard from './Components/StudentDashoard';
import AdminDashboard from './Components/AdminDashboard';
import TaskAssignment from './Components/TaskAssignment';
import AddStudent from './Components/AddStudent';

function App() {

  // DB CONNECTION
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/student' element={<StudentDashoard/>}></Route>
      <Route path='/admin' element={<AdminDashboard/>}></Route>
      <Route path='/taskassignment' element={<TaskAssignment/>}></Route>
      <Route path='/admin/add' element={<AddStudent/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
