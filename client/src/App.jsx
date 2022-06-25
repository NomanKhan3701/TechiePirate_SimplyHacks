import { Routes, Route } from 'react-router'
import { CreateEvent, Events, Home, Login, Posts, Signup, ViewEvent, ViewPost } from './pages/import';
import { CreatePost, Navbar } from './components/import';
import "react-toastify/dist/ReactToastify.css";
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
      </Routes>
    </div>
  );
}

export default App;
