import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-2' });

const poolData = {
  UserPoolId: 'eu-west-2_zK6duScO8', 
  ClientId: '186c0hq8e0csf5a5bcrbkcs1ms' // You can get this from the AWS Cognito user pool settings
};

const userPool = new CognitoUserPool(poolData);

export const handleSignup = (email, password) => {
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, null, null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.user);
    });
  });
};

export const handleLogin = (username, password) => {
  return new Promise((resolve, reject) => {
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

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve({ cognitoUser, userType: result.getIdToken().payload['cognito:groups'] || 'user' });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const getCurrentUserAsync = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
          return;
        }
        if (session.isValid()) {
          resolve(cognitoUser);
        } else {
          reject(new Error("Session is invalid"));
        }
      });
    } else {
      resolve(null);
    }
  });
};

export const handleLogout = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
};

