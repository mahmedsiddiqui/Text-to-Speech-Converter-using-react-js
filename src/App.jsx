import React, { useState, useEffect } from 'react';
import '../src/App.css'
function App() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [voices, setVoices] = useState([]);

  // Fetch available voices from Web Speech API
  useEffect(() => {
    const synth = window.speechSynthesis;

    const fetchVoices = () => {
      let availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    fetchVoices();

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = fetchVoices;
    }
  }, []);

  // Text-to-speech function
  const speak = () => {
    if (text !== '') {
      const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(text);
      const selectedVoice = voices.find(voice => voice.lang === language);
      utterThis.voice = selectedVoice;
      synth.speak(utterThis);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Text-to-Speech Converter</h1>
      <div>
        <textarea
          rows="4"
          cols="50"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="language">Choose Language: </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>
      <div>
        <button onClick={speak}>Speak</button>
      </div>
    </div>
  );
}

export default App;
