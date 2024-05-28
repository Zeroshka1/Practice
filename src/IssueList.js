// IssueList.js
import React, { useState, useEffect } from 'react';

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const portNUM = 8000;
  const ip = 'localhost';
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(`http://${ip}:${portNUM}/api/issues/`);
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className='ListContent'>
      <h2>Список обращений</h2>
      <ul className='List'>
        {issues.map((issue, index) => (
          <li key={index}>
            <strong>{issue.name}</strong>: <p>{issue.text}</p> <strong className='status'>Статус: {issue.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;
