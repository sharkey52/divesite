import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const poolData1 = {
  UserPoolId: 'eu-west-2_zK6duScO8',
  ClientId: '186c0hq8e0csf5a5bcrbkcs1ms',
};

const poolData2 = {
  UserPoolId: 'eu-west-2_rixaGWXgZ',
  ClientId: '186c0hq8e0csf5a5bcrbkcs1ms',
};

const poolData3 = {
  UserPoolId: 'eu-west-2_gs3SdN5pu',
  ClientId: '186c0hq8e0csf5a5bcrbkcs1ms',
};

const userPool1 = new CognitoUserPool(poolData1);
const userPool2 = new CognitoUserPool(poolData2);
const userPool3 = new CognitoUserPool(poolData3);

export const handleLogin = async (username, password) => {
  const authenticationData = {
    Username: username,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  let cognitoUser = null;
  let userType = null;

  try {
    // Try user pool 1
    cognitoUser = new CognitoUser({ Username: username, Pool: userPool1 });
    await authenticateUser(cognitoUser, authenticationDetails);
    userType = 'user';
  } catch (error1) {
    try {
      // Try user pool 2
      cognitoUser = new CognitoUser({ Username: username, Pool: userPool2 });
      await authenticateUser(cognitoUser, authenticationDetails);
      userType = 'staff';
    } catch (error2) {
      try {
        // Try user pool 3
        cognitoUser = new CognitoUser({ Username: username, Pool: userPool3 });
        await authenticateUser(cognitoUser, authenticationDetails);
        userType = 'manager';
      } catch (error3) {
        throw new Error("Authentication failed for all user pools.");
      }
    }
  }

  return { cognitoUser, userType };
};

const authenticateUser = (cognitoUser, authenticationDetails) => {
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        resolve(session);
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

export const getCurrentUserAsync = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser1 = userPool1.getCurrentUser();
    if (cognitoUser1) {
      cognitoUser1.getSession((error, session) => {
        if (error) {
          reject(error);
        } else {
          resolve(cognitoUser1);
        }
      });
    } else {
      const cognitoUser2 = userPool2.getCurrentUser();
      if (cognitoUser2) {
        cognitoUser2.getSession((error, session) => {
          if (error) {
            reject(error);
          } else {
            resolve(cognitoUser2);
          }
        });
      } else {
        const cognitoUser3 = userPool3.getCurrentUser();
        if (cognitoUser3) {
          cognitoUser3.getSession((error, session) => {
            if (error) {
              reject(error);
            } else {
              resolve(cognitoUser3);
            }
          });
        } else {
          reject(new Error('No current user'));
        }
      }
    }
  });
};

export const handleLogout = (user) => {
  if (user) {
    user.signOut();
  }
};

