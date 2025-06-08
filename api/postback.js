// Create this file in a server directory or as a serverless function

export default function handler(req, res) {
  try {
    const { appid, userid, payout } = req.query;
    
    // Validate parameters
    if (!appid || !userid || !payout) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Missing required parameters' 
      });
    }
    
    const payoutAmount = parseFloat(payout);
    if (isNaN(payoutAmount) || payoutAmount <= 0) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Invalid payout amount' 
      });
    }
    
    // Log the postback (since we can't use localStorage on server)
    console.log('Postback received:', { appid, userid, payout });
    
    // Return success response
    return res.status(200).json({
      status: 'success',
      message: 'Postback processed successfully',
      data: { appid, userid, payout, timestamp: new Date().toISOString() }
    });
  } catch (error) {
    console.error('Postback error:', error);
    return res.status(500).json({ 
      status: 'error', 
      message: 'Internal server error' 
    });
  }
}