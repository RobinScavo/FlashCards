import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import YourDecks from './components/YourDecks/YourDecks';
import CreateDeck from './components/CreateDeck/CreateDeck';
import EditDeck from './components/EditDeck/EditDeck';
import NotFound from './components/NotFound/NotFound';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/your-decks' element={<YourDecks />} />
          <Route path='/create-deck' element={<CreateDeck />} />
          <Route path='/edit-deck/:id' element={<EditDeck />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
