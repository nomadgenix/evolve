import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const inputRef = useRef(null);
    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);
    const typeText = (text, delay = 30) => {
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
        if (!input.trim())
            return;
        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        setIsProcessing(true);
        try {
            const res = await api.sendMessage(input);
            const reply = res.message || 'Here’s a simulated response.';
            setMessages(prev => [...prev, { text: '', sender: 'ai' }]);
            typeText(reply);
        }
        catch {
            setMessages(prev => [...prev, {
                    text: 'Sorry, something went wrong.',
                    sender: 'ai'
                }]);
        }
        finally {
            setIsProcessing(false);
            setInput('');
        }
    };
    return (_jsxs("div", { className: "app-container", children: [_jsxs("header", { className: "header", children: [_jsx("div", { className: "logo", children: "AI Assistant" }), _jsx("button", { className: "theme-toggle", onClick: () => setDarkMode(p => !p), children: darkMode ? '🌞' : '🌙' })] }), _jsx("main", { className: "chat-demo", children: _jsxs("div", { className: "chat-container", children: [_jsxs("div", { className: "chat-messages", children: [messages.map((msg, i) => (_jsx("div", { className: `message ${msg.sender}-message`, children: msg.sender === 'ai' ? (_jsxs("div", { className: "avatar-message", children: [_jsx("img", { src: "/agent.png", alt: "AI Avatar", className: `chat-avatar ${i === messages.length - 1 && isTyping ? 'typing' : ''}` }), _jsxs("div", { className: "message-text", children: [i === messages.length - 1 && isTyping ? typedText : msg.text, i === messages.length - 1 && isTyping && _jsx("span", { className: "blinking-cursor" })] })] })) : msg.text }, i))), isProcessing && (_jsx("div", { className: "message ai-message", children: _jsxs("div", { className: "typing-indicator", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }) }))] }), _jsxs("div", { className: "chat-input-container", children: [_jsx("input", { ref: inputRef, type: "text", className: "chat-input", placeholder: "Ask me anything...", value: input, onChange: (e) => setInput(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleSendMessage() }), _jsx("button", { className: "send-button", onClick: handleSendMessage, children: "Send" })] })] }) })] }));
}
export default App;
