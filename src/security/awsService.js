import AWS from './awsConfig';

export const getCognitoUserGroups = (username, userPoolId) => {
  const cognito = new AWS.CognitoIdentityServiceProvider();

  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  return new Promise((resolve, reject) => {
    cognito.adminListGroupsForUser(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Groups);
      }
    });
  });
};

