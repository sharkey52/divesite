import React, { useState, useEffect} from 'react';
import { getCurrentUserAsync, handleLogin, handleLogout, handleSignup } from './security/auth';
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
import SignupPage from './security/SignupPage'; // <-- Add this import statement
import LoadingScreen from './LoadingScreen';

const App = () => {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('user');
  const [username, setUsername] = useState('John Doe');
  const [content, setContent] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);

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
      const { cognitoUser, userType } = await handleLogin(username, password);
      setUser(cognitoUser);
      setMode(userType);
      setUsername(username);
      setContent('dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Signup function
  const signup = async (email, password) => {
    try {
      const cognitoUser = await handleSignup(email, password);
      setUser(cognitoUser);
      setUsername(email);
      setContent('dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const logout = () => {
    handleLogout();
    setUser(null);
    setUsername(null);
    setContent('landing');
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const getSideBar = () => {
    switch (mode) {
      case 'user':
        return <NavbarLeftUser onContentChange={handleContentChange} />;
      case 'staff':
        return <NavbarLeftStaff />;
      case 'manager':
        return <NavbarLeftManager />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`app`}>
      {content === 'landing' && (
        <LandingPage onLogin={login} onLoginSuccess={() => setContent('dashboard')} />
      )}
      {content === 'signup' && (
        <SignupPage onSignupSuccess={signup} />
      )}
      {content !== 'landing' && content !== 'signup' && (
        <>
          <NavbarTop username={username} onLogout={logout} />
          <div className="navbar-left-desktop">{getSideBar()}</div>
          {content === 'dashboard' && <Dashboard />}
          {content === 'bookadive' && <DiveCenter />}
          {content === 'logbook' && <DiveLogBook />}
          <Footer className="footer-desktop" />
        </>
      )}
    </div>
  );
};

export default App;

