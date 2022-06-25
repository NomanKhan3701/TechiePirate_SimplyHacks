import { Routes, Route } from 'react-router'
import { CreateEvent, Events, Home, Login, Posts, Signup } from './pages/import';
import { CreatePost, Navbar } from './components/import';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/events' element={<Events />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/createevent' element={<CreateEvent />} />
        <Route path='/createpost' element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
