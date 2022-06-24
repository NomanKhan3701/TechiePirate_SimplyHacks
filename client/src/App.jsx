import { Routes, Route } from 'react-router'
import { CreateEvent, Home, Login, Posts, Signup } from './pages/import';
import { Navbar } from './components/import';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/createevent' element={<CreateEvent />} />
      </Routes>
    </div>
  );
}

export default App;
