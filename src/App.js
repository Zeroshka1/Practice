import React, { useState, useEffect } from 'react';
import NavigationMenu from './NavigationMenu';
import CreateIssueForm from './CreateIssueForm';
import IssueList from './IssueList';
import AdminPanel from './AdminPanel';

const App = () => {
  const [issues, setIssues] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showNewIssuePage, setShowNewIssuePage] = useState(false);

  const portNUM = 8000;
  const ip = 'localhost';

  // Вынесем функцию fetchIssues из блока useEffect
  const fetchIssues = async () => {
    try {
      const response = await fetch(`http://${ip}:${portNUM}/api/issues`);
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  useEffect(() => {
    fetchIssues(); // Вызываем fetchIssues при монтировании компонента
  }, []);

  const handleSubmitIssue = async (formData) => {
    try {
      if (loggedIn && !showNewIssuePage) {
        const response = await fetch(`http://${ip}:${portNUM}/api/issues`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        setIssues([...issues, data]);

        fetchIssues(); // Вызываем fetchIssues после успешного создания обращения
      }
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  const handleChangeIssueStatus = async (id, newStatus) => {
    try {
      await fetch(`http://${ip}:${portNUM}/api/issues/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedIssues = issues.map(issue => {
        if (issue.id === id) {
          return { ...issue, status: newStatus };
        }
        return issue;
      });
      setIssues(updatedIssues);
    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  };

  const handleDeleteIssue = async (id) => {
    try {
      await fetch(`http://${ip}:${portNUM}/api/issues/${id}`, {
        method: 'DELETE',
      });
      const updatedIssues = issues.filter(issue => issue.id !== id);
      setIssues(updatedIssues);
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setLoggedIn(true);
  };

  const handleNavigateToIssues = () => {
    setShowNewIssuePage(false);
    setLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div className='main'>
      <NavigationMenu isAdmin={isAdmin} onAdminLogin={handleAdminLogin} onNavigateToIssues={handleNavigateToIssues} />
      {!loggedIn && !showNewIssuePage && (
        <div className='ListAndInput'>
          <div className='formInput'>
            <h2>Форма создания обращения</h2>
            <CreateIssueForm onSubmit={handleSubmitIssue} />
          </div>
          <div className='ListWrapper'>
            <IssueList issues={issues} />
          </div>
        </div>
      )}
      {loggedIn && isAdmin && (
        <div className='AdminPanel'>
          <AdminPanel issues={issues} onChangeStatus={handleChangeIssueStatus} onDeleteIssue={handleDeleteIssue} />
        </div>
      )}
    </div>
  );
};

export default App;
