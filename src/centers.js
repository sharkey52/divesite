import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

const MyComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      // Initialize AWS SDK with your credentials and region
      AWS.config.update({
        accessKeyId: 'AKIAUD7QSWK5JCU2IQT6',
        secretAccessKey: 'ioYiz4fJ0GdbsTf+gClvQk8Tghs5eCJKRuj8gwWd',
        region: 'eu-west-2',
      });

      // Create DynamoDB and S3 instances
      const dynamodb = new AWS.DynamoDB.DocumentClient();
      const s3 = new AWS.S3();

      // Fetch 5 random items from DynamoDB
	console.log('hello world')
      const params = {
        TableName: 'divelocations',
        Limit: 2,
      };

      const { Items } = await dynamodb.scan(params).promise();

	// Get the associated images from the URL stored in DynamoDB
	const itemsWithImages = Items.map((item) => {
	  const imageUrl = item.imageKey; // Assuming 'imageUrl' is the attribute name storing the image URL in DynamoDB
	console.log(item)
	  return {
	    ...item,
	    imageUrl,
	  };
	});      

      setItems(itemsWithImages);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const getImageUrl = async (s3, imageKey) => {
    try {
      const params = {
        Bucket: 'diveshopthumbnails',
        Key: imageKey,
      };

      const { Location } = await s3.getObject(params).promise();
      return Location;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const handleRefresh = () => {
    fetchItems();
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
            <img src={item.imageUrl} alt={item.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;

