import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-2_zK6duScO8',
  ClientId: '186c0hq8e0csf5a5bcrbkcs1ms',
};

const userPool = new CognitoUserPool(poolData);

const handleNewPassword = (username, temporaryPassword, newPassword) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  const authenticationData = {
    Username: username,
    Password: temporaryPassword,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (session) => {
      console.log('Authentication successful');
    },
    onFailure: (error) => {
      console.error('Authentication error:', error);
    },
    newPasswordRequired: (userAttributes, requiredAttributes) => {
      cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
        onSuccess: (result) => {
          console.log('Password changed successfully');
        },
        onFailure: (error) => {
          console.error('Error changing password:', error);
        },
      });
    },
  });
};

export default handleNewPassword;

