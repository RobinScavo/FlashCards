import Card from '../Card/Card';

// import { Link } from 'react-router-dom';

import './DecksContainer.css'

const DecksContainer = ({ decks }) => {
    console.log(decks)

    return (
        <div className="deck-container">
            {decks.map((deck) => (
                <Card key={deck.id} title={deck.title} subject={deck.subject} />
            ))}
        </div>
     );
}

export default DecksContainer;
