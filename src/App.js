import React, { useState, useEffect, useContext } from 'react';
import { getCurrentUserAsync, handleLogin, handleLogout, handleSignUp } from './security/auth';
import handleNewPassword from './security/NewPasswordHandler';
import './styles/App.css';
import NavbarTop from './NavbarTop';
import NavbarLeftUser from './NavbarLeftUser';
import NavbarLeftStaff from './NavbarLeftStaff';
import NavbarLeftManager from './NavbarLeftManager';
import Footer from './Footer';
import Dashboard from './Dashboard';
import DiveCenter from './components/BookDive'; 
import DiveLogBook from './components/DiveLogBook';
import LandingPage from './security/LandingPage';
import NewPasswordForm from './security/NewPasswordForm';
import LoadingScreen from './LoadingScreen';
import { ThemeContext } from './ThemeContext';

const App = () => {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('user');
  const [username, setUsername] = useState('John Doe');
  const [content, setContent] = useState('landing');
  const [newPasswordRequired, setNewPasswordRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUserAsync();
        if (currentUser) {
          setUser(currentUser);
          setUsername(currentUser.getUsername());
          setContent('dashboard');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error getting current user:', error);
        setIsLoading(false);
      }
    };
    checkCurrentUser();
  }, []);

  const login = async (username, password) => {
    try {
      const user = await handleLogin(username, password);
      setUser(user);
      setUsername(username);
      setContent('dashboard');
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'PasswordResetRequiredException') {
        setNewPasswordRequired(true);
      }
    }
  };

  const logout = () => {
    handleLogout(user);
    setUser(null);
    setUsername(null);
    setContent('landing');
  };

  const signUp = async (username, password, email) => {
    try {
      await handleSignUp(username, password, email);
      login(username, password);
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  const handleNewPassword = async (username, temporaryPassword, newPassword) => {
    try {
      await handleNewPassword(username, temporaryPassword, newPassword);
      await login(username, newPassword);
    } catch (error) {
      console.error('Error changing password and logging in:', error);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`app ${theme}`}>
      {content === 'landing' && !newPasswordRequired && <LandingPage onLogin={login} onSignUp={signUp} />}
      {newPasswordRequired && <NewPasswordForm onNewPassword={handleNewPassword} />}
      {content !== 'landing' && !newPasswordRequired && (
        <>
          <NavbarTop username={username} onModeChange={handleModeChange} onLogout={logout} />
          {mode === 'user' && <NavbarLeftUser onContentChange={handleContentChange} />}
          {mode === 'staff' && <NavbarLeftStaff />}
          {mode === 'manager' && <NavbarLeftManager />}
          {content === 'dashboard' && <Dashboard />}
          {content === 'bookadive' && <DiveCenter />} {/* Added line to include DiveCenter */}
          {content === 'logbook' && <DiveLogBook />}
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;

