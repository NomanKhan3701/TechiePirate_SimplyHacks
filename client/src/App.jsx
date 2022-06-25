import { Routes, Route } from 'react-router'
import { CreatePost, Map, Navbar } from './components/import';
import { CreateEvent, Events, Home, Login, Payment, Posts, Profile, Signup, ViewEvent, ViewPost } from './pages/import';

import "react-toastify/dist/ReactToastify.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className="app">
      <AuthProvider>
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
          <Route path='/donate' element={<Payment />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
