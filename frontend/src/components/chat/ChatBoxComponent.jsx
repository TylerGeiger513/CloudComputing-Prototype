import React, { useState } from 'react';
import styles from '../../styles/ChatBox.module.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState('light'); // default theme is light

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setMessages([...messages, input]);
    setInput('');
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`${styles['chat-box']} ${styles[theme]}`}>
      <div className={styles['chat-header']}>
        <button className={styles['theme-toggle']} onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
      <div className={styles['chat-messages']}>
        {messages.map((message, index) => (
          <div key={index} className={styles['chat-message']}>
            {message}
          </div>
        ))}
      </div>
      <form className={styles['chat-input']} onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
