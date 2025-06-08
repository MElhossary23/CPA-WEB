
/**
 * Utility functions for interacting with the backend API
 */

import { addEarning } from './earningsService';

interface ConversionData {
  userid: string;
  amount: string;
  offer: string;
  transaction: string;
}

/**
 * Send conversion data to the local earnings system
 * This function now stores earnings locally instead of calling an external API
 */
export const sendConversionData = async (data: ConversionData): Promise<{ status: string; message: string }> => {
  try {
    // Parse the amount to a number
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Invalid amount');
    }

    // Add earning to local storage
    const earning = addEarning({
      userId: data.userid,
      appId: data.offer, // Use offer name as app ID
      amount: amount,
      status: 'pending', // Mark as pending initially
      offerName: data.offer
    });

    console.log("Conversion data processed locally:", data);
    console.log("Earning created:", earning);

    return {
      status: 'success',
      message: `Conversion tracked successfully. Earning ID: ${earning.id}`
    };
  } catch (error) {
    console.error("Error processing conversion data:", error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Mock function to simulate a conversion for testing
 * This creates a pending earning that will be confirmed via postback
 */
export const mockConversion = (userId: string, offerName: string): void => {
  const mockData = {
    userid: userId,
    amount: "0.50", // Example amount
    offer: offerName,
    transaction: `tx_${Date.now()}` // Generate a unique transaction ID
  };

  console.log("Mock conversion data:", mockData);
  // Process the conversion locally
  sendConversionData(mockData)
    .then(result => {
      console.log("Conversion result:", result);
    })
    .catch(error => {
      console.error("Error with conversion:", error);
    });
};
