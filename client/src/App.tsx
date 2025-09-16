import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import MatrixBackground from './components/MatrixBackground';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'AI Terminal v1.0.0 - Type your questions below',
      timestamp: new Date(),
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages, currentInput, isTyping]);

  // Focus input when clicking anywhere on terminal
  useEffect(() => {
    const handleClick = () => {
      if (!isTyping) {
        inputRef.current?.focus();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isTyping]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Simulate AI response with typing effect
  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true);

    // Simulate API delay
    await new Promise(resolve =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    // Generate a mock AI response
    const responses = [
      `Analyzing your query: "${userMessage}"...`,
      'I understand your question. Let me provide you with some insights.',
      "That's an interesting question. Based on my knowledge, here's what I can tell you:",
      "Processing your request... Here's my response:",
      'Thank you for your question. Let me break this down for you:',
    ];

    const mockResponse =
      responses[Math.floor(Math.random() * responses.length)] +
      ` This is a simulated AI response to demonstrate the terminal interface. In a real implementation, this would connect to your AI service.`;

    const botMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: mockResponse,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTyping) {
      if (!currentInput.trim()) return;

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: currentInput.trim(),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);

      // Simulate AI response
      simulateAIResponse(currentInput.trim());

      // Clear input
      setCurrentInput('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const renderMessage = (message: Message) => {
    const time = formatTime(message.timestamp);

    switch (message.type) {
      case 'system':
        return (
          <div key={message.id} className="message system-message">
            <span className="system-label">[SYSTEM]</span>{' '}
            <span className="system-text">{message.content}</span>
          </div>
        );
      case 'user':
        return (
          <div key={message.id} className="message user-message">
            <div className="prompt-line">
              <span className="user-prompt">user@terminal</span>
              <span className="prompt-separator">:</span>
              <span className="prompt-path">~</span>
              <span className="prompt-dollar">$ </span>
              <span className="user-text">{message.content}</span>
            </div>
            <div className="timestamp">[{time}]</div>
          </div>
        );
      case 'bot':
        return (
          <div key={message.id} className="message bot-message">
            <div className="prompt-line">
              <span className="bot-prompt">ai-bot@terminal</span>
              <span className="prompt-separator">:</span>
              <span className="prompt-path">~</span>
              <span className="prompt-dollar">$ </span>
            </div>
            <div className="bot-text">{message.content}</div>
            <div className="timestamp">[{time}]</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="terminal-container">
      {/* Matrix Background */}
      <MatrixBackground />

      {/* Terminal Header */}
      {/* <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
        </div>
        <span className="terminal-title">AI Terminal Chat</span>
      </div> */}

      {/* Terminal Content */}
      <div ref={terminalRef} className="terminal-content">
        {messages.map(renderMessage)}

        {isTyping && (
          <div className="message typing-message">
            <div className="prompt-line">
              <span className="bot-prompt">ai-bot@terminal</span>
              <span className="prompt-separator">:</span>
              <span className="prompt-path">~</span>
              <span className="prompt-dollar">$ </span>
            </div>
            <span className="thinking-text">
              Thinking<span className="thinking-dots">...</span>
            </span>
          </div>
        )}

        {/* Current Input Line */}
        {!isTyping && (
          <div className="input-line">
            <span className="user-prompt">user@terminal</span>
            <span className="prompt-separator">:</span>
            <span className="prompt-path">~</span>
            <span className="prompt-dollar">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={e => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="terminal-input"
              autoFocus
            />
            {/* <span className="cursor">█</span> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
