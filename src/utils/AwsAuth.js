import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION } from '../env';

export const createAwsClient = (ClientConstructor, options = {}) => {
  // Create client configuration
  const clientConfig = {
    region: AWS_REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY
    },
    ...options,
  };

  return new ClientConstructor(clientConfig);
};