// CreateIssueForm.js
import React, { useState } from 'react';

const CreateIssueForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const portNUM = 8000;
  const ip = 'localhost';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !text) return;

    try {
      const response = await fetch(`http://${ip}:${portNUM}/api/issues/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, text }),
      });
      const data = await response.json();
      onSubmit(data);
      setName('');
      setText('');
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Текст обращения"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Создать обращение</button>
    </form>
  );
};

export default CreateIssueForm;
