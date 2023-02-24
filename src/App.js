import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import LoveWords from './LoveWords';
import Home from './Home';
import Layout from './Layout';
import MyHappiness from './MyHappiness';
import NoPage from './Nopage';
import LoveLetter from './LoveLetter';
import Daoqian from './Daoqian';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tolove" element={<LoveLetter />} />
          <Route path="myhappiness" element={<MyHappiness />} />
          <Route path="daoqian" element={<Daoqian />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
