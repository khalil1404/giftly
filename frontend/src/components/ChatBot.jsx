import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Bonjour ! 👋 Je suis votre assistant cadeaux. Décrivez-moi la personne et je vous suggère le cadeau parfait !",
      gifts: []
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    "Cadeau pour un ami gamer 🎮",
    "Idée cadeau anniversaire maman",
    "Budget 100 TND pour un créatif",
    "Cadeau Aïd pour mon père",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    setMessages(prev => [...prev, { role: 'user', text: messageText, gifts: [] }]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: messageText });
      setMessages(prev => [...prev, {
        role: 'bot',
        text: res.data.text,
        gifts: res.data.gifts || []
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: "Désolé, une erreur s'est produite. Réessayez ! 😅",
        gifts: []
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button className="chat-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '🎁'}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">🎁</div>
              <div>
                <div className="chat-name">Assistant Giftly</div>
                <div className="chat-status">● En ligne</div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role}`}>
                <div className="chat-bubble">{msg.text}</div>
                {msg.gifts && msg.gifts.length > 0 && (
                  <div className="chat-gifts">
                    {msg.gifts.map((gift, j) => (
                      <div key={j} className="chat-gift-card">
                        <span className="chat-gift-icon">{gift.image}</span>
                        <div className="chat-gift-info">
                          <div className="chat-gift-name">{gift.name}</div>
                          <div className="chat-gift-price">{gift.price} TND</div>
                        </div>
                        <a href={gift.link} target="_blank" rel="noreferrer" className="chat-gift-btn">
                          Voir →
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-message bot">
                <div className="chat-bubble chat-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="chat-suggestions">
              {suggestions.map((s, i) => (
                <button key={i} className="chat-suggestion" onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Décrivez la personne..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button className="chat-send" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
