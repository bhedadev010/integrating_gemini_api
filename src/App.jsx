import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer('loading...');
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=x",
      method: "post",
      data: { "contents": [{ "parts": [{ text: question }] }] }
    });
    setAnswer(response.data.candidates[0].content.parts[0].text);
  }

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">Dev Chatbot</h1>  {/* Change title here */}
      <div className="chatbox">
        <textarea
          className="chat-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          cols="30"
          rows="10"
          placeholder="Ask me anything..."
        ></textarea>
        <button className="chat-button" onClick={generateAnswer}>
          Generate Answer
        </button>
      </div>
      <div className="answer">
        <pre>{answer}</pre>
      </div>
    </div>
  );
}

export default App;
