import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './Chat';
import Home from './Home';
import { SessionProvider } from './Contexts/NameContext';

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/chat' element={ <Chat /> } />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
