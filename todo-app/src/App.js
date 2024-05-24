import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import './App.css';

// import store from './app/store';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';

// axios.defaults.withCredentials = true;

function App() {
  return (
    // <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    // </Provider>
  );
}

export default App;
