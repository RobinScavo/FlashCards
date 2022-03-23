import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import YourDecks from './components/YourDecks';
import CreateDeck from './components/CreateDeck';
import EditDeck from './components/EditDeck';
import NotFound from './components/NotFound';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
