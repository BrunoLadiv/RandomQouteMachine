


import { useState, useEffect } from 'react';



function App() {
  const [quotes, setQuotes] = useState('');
  const [color, setColor] = useState('#ffffff');

  const getQuote = () => {
    fetch('https://type.fit/api/quotes')
      .then(res => res.json())
      .then(data => {
        let randomNumber = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNumber]);
      });
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const updateColor = () => {
    setColor(getRandomColor());
  };

  useEffect(() => {
    getQuote();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <wrapper id="quote-box">
      <div id="text"><h2>{quotes.text}</h2></div>
      <div id="author"><h4>- {quotes.author}</h4></div>
      <button className='button'  onClick={() => {
        getQuote();
        updateColor();
      }} id="new-quote">New Quote</button>
      <a className='button' target="_blank" href={`https://twitter.com/intent/tweet?text=${quotes.text}   -${quotes.author}`} id="tweet-quote" rel='noopener noreferrer'>Tweet Quote</a>
    </wrapper>
  );
}

export default App;
