import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateCollection from './pages/CreatedCollection';
import MintCollection from './pages/MintCollection';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateCollection />} />
        <Route path="/mint/:id" element={<MintCollection />} />
      </Routes>
    </BrowserRouter>
  );
}