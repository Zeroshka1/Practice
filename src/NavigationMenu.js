import React, { useState, useEffect } from 'react';

const NavigationMenu = ({ onAdminLogin, onNavigateToIssues, isAdmin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleLogin = () => {
        const isAdminLoggedIn = username === 'admin' && password === 'admin';
        if (isAdminLoggedIn) {
            onAdminLogin();
            setShowLoginForm(false); // Скрываем форму входа после успешного входа
        } else {
            alert('Неверный логин или пароль админа');
        }
    };
    
    const handleLogout = () => {
        setUsername('');
        setPassword('');
    };
    
    const handleAdminPanelButtonClick = () => {
        if (!isAdmin) {
          setShowLoginForm(true); // Показываем форму входа при клике на кнопку "Панель администратора"
        }
      };

    const handleCloseAdminPanel = () => {
        setShowLoginForm(false); // Закрываем панель администратора при клике на изображение "close"
    };

    const handlePanelClick = (e) => {
        e.stopPropagation(); // Предотвращаем всплытие события
    };
    
    useEffect(() => {
        if (showLoginForm) {
            document.body.classList.add('admin-overlay-active'); // Добавляем класс для стилизации body
        } else {
            document.body.classList.remove('admin-overlay-active'); // Удаляем класс для стилизации body
        }
    }, [showLoginForm]);
    
    return (
        <nav className='navigation'>
            <div className="logo">
                <img src="https://i.postimg.cc/t4sCFbVC/Logo.png" alt="Company Logo" className='logoImg' />
            </div>
            <div className="user-menu">
                <button onClick={onNavigateToIssues}>К обращениям</button>
                <button onClick={handleAdminPanelButtonClick}>Панель администратора</button>
            </div>
            {showLoginForm && (
                <div className="admin-overlay" onClick={handleCloseAdminPanel}>
                    <div className='admin-panel-wrapper'>
                        <div className="admin-panel" onClick={handlePanelClick}>
                            <div className='close-admin' onClick={handleCloseAdminPanel}><img src='https://i.postimg.cc/Fz5t2tPm/close.png' alt='close'></img></div>
                            <h2>Панель администратора</h2>
                            <input type="text" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={handleLogin}>Войти как админ</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavigationMenu;
