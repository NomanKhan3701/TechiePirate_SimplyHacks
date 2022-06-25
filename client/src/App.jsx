import { Routes, Route } from 'react-router'
import { CreateEvent, Events, Home, Login, Posts, Signup } from './pages/import';
import { Navbar } from './components/import';
import ViewEvent from './pages/ViewEvent/ViewEvent';

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
        <Route path='/event/:id' element={<ViewEvent />} />
      </Routes>
    </div>
  );
}

export default App;
