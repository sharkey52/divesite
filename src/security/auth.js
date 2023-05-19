import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-2_zK6duScO8',
  ClientId: '186c0hq8e0csf5a5bcrbkcs1ms',
};

const userPool = new CognitoUserPool(poolData);

export const getCurrentUserAsync = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((error, session) => {
        if (error) {
          reject(error);
        } else {
          resolve(cognitoUser);
        }
      });
    } else {
      reject(new Error('No current user'));
    }
  });
};

export const handleLogin = (username, password) => {
  const authenticationData = {
    Username: username,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        resolve(cognitoUser);
      },
      onFailure: (error) => {
        reject(error);
      },
      newPasswordRequired: () => {
        reject('New password required');
      },
    });
  });
};

export const handleLogout = (user) => {
  if (user) {
    user.signOut();
  }
};

export const handleSignUp = (username, password, email) => {
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

