import { useState, useEffect, useRef } from 'react';
import './App.css';
import api from './api';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! I’m your assistant. How can I help you today?', sender: 'ai' }
  ]);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const typeText = (text: string, delay = 30) => {
    setTypedText('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(prev => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, delay);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setIsProcessing(true);
    try {
      const res = await api.sendMessage(input);
      const reply = res.message || 'Here’s a simulated response.';
      setMessages(prev => [...prev, { text: '', sender: 'ai' }]);
      typeText(reply);
    } catch {
      setMessages(prev => [...prev, {
        text: 'Sorry, something went wrong.',
        sender: 'ai'
      }]);
    } finally {
      setIsProcessing(false);
      setInput('');
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">AI Assistant</div>
        <button className="theme-toggle" onClick={() => setDarkMode(p => !p)}>
          {darkMode ? '🌞' : '🌙'}
        </button>
      </header>

      <main className="chat-demo">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}-message`}>
                {msg.sender === 'ai' ? (
                  <div className="avatar-message">
                    <img
                      src="/agent.png"
                      alt="AI Avatar"
                      className={`chat-avatar ${i === messages.length - 1 && isTyping ? 'typing' : ''}`}
                    />
                    <div className="message-text">
                      {i === messages.length - 1 && isTyping ? typedText : msg.text}
                      {i === messages.length - 1 && isTyping && <span className="blinking-cursor" />}
                    </div>
                  </div>
                ) : msg.text}
              </div>
            ))}
            {isProcessing && (
              <div className="message ai-message">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="send-button" onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;


