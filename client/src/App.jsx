import { Routes, Route } from 'react-router'
import { CreatePost, Map, Navbar } from './components/import';
import { CreateEvent, Events, Home, Login, Posts, Profile, Signup, ViewEvent, ViewPost } from './pages/import';

import "react-toastify/dist/ReactToastify.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="app">
      <ToastContainer></ToastContainer>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/events' element={<Events />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/createevent' element={<CreateEvent />} />
        <Route path='/event/:id' element={<ViewEvent />} />
        <Route path='/post/:id' element={<ViewPost />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/map' element={<Map />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
