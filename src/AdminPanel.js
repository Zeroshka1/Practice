// AdminPanel.js
import React from 'react';

const AdminPanel = ({ issues, onChangeStatus, onDeleteIssue }) => {
  const portNUM = 8000;
  const ip = 'localhost';
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://${ip}:${portNUM}/api/issues/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      onChangeStatus(id, newStatus);
    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  };

  const handleDeleteIssue = async (id) => {
    try {
      await fetch(`http://${ip}:${portNUM}/api/issues/${id}`, {
        method: 'DELETE',
      });
      onDeleteIssue(id);
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  return (
    <div className='AdminApp'>
      <h2>Административная панель</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <strong>{issue.name}</strong>: {issue.text} <br></br><strong className='status'>Статус: {issue.status}</strong> 
            <div className='divBtnAdmin'>
              <button onClick={() => handleStatusChange(issue.id, 'Решено')} className='btnAdmin'>Решено</button>
              <button onClick={() => handleStatusChange(issue.id, 'Не решено')} className='btnAdmin'>Не решено</button>
              <button onClick={() => handleDeleteIssue(issue.id)} className='btnAdmin'>Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
