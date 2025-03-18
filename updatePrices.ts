import payload from 'payload';

const updatePrices = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/payload-cms',
  });

  // Fetch all media documents
  const mediaCollection = await payload.find({
    collection: 'media',
    limit: 1000, // Adjust limit as needed
  });

  // Iterate over each document and update the price
  for (const media of mediaCollection.docs) {
    await payload.update({
      collection: 'media',
      id: media.id,
      data: {
        price: 100, // Set your desired price here
      },
    });
  }

  console.log('Prices updated successfully!');
};

// Run the update function
updatePrices().catch((err) => {
  console.error('Error updating prices:', err);
}); 