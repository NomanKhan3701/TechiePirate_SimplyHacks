import { Routes, Route } from 'react-router'
import { Map, Navbar } from './components/import';
import { CreatePost, Cancel, CreateEvent, Events, Home, Login, Payment, Posts, Profile, Signup, Success, ViewEvent, ViewPost } from './pages/import';

import "react-toastify/dist/ReactToastify.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './contexts/AuthContext';
import Leaderboard from './pages/Leaderboard/Leaderboard';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ToastContainer></ToastContainer>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/posts/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<ViewPost />} />
          <Route path='/events' element={<Events />} />
          <Route path='/events/create' element={<CreateEvent />} />
          <Route path='/event/:id' element={<ViewEvent />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile/:email' element={<Profile />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
