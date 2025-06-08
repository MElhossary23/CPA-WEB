import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { processPostback } from '@/utils/earningsService';

/**
 * Postback page to handle conversion tracking
 * Expected URL format: /postback?appid={app_id}&userid={user_id}&payout={payout}
 */
const Postback = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const processPostbackRequest = async () => {
      try {
        // Extract parameters from URL
        const appId = searchParams.get('appid');
        const userId = searchParams.get('userid');
        const payoutStr = searchParams.get('payout');

        // Validate required parameters
        if (!appId || !userId || !payoutStr) {
          setStatus('error');
          setMessage('Missing required parameters. Expected: appid, userid, payout');
          return;
        }

        // Parse payout amount
        const payout = parseFloat(payoutStr);
        if (isNaN(payout) || payout <= 0) {
          setStatus('error');
          setMessage('Invalid payout amount');
          return;
        }

        try {
          // Process the postback
          const earning = processPostback(appId, userId, payout);
          
          setStatus('success');
          setMessage(`Conversion tracked successfully. Earning ID: ${earning.id}`);
        } catch (error) {
          // Handle localStorage errors specifically
          console.error('LocalStorage error:', error);
          setStatus('error');
          setMessage('Error accessing storage. This might be a server-side rendering issue.');
        }
      } catch (error) {
        console.error('Error processing postback:', error);
        setStatus('error');
        setMessage('Internal server error');
      }
    };

    processPostbackRequest();
  }, [searchParams]);

  // Return appropriate response based on status
  const getResponseContent = () => {
    switch (status) {
      case 'processing':
        return {
          statusCode: 200,
          message: 'Processing...'
        };
      case 'success':
        return {
          statusCode: 200,
          message: 'OK'
        };
      case 'error':
        return {
          statusCode: 400,
          message: 'ERROR'
        };
      default:
        return {
          statusCode: 500,
          message: 'UNKNOWN'
        };
    }
  };

  const response = getResponseContent();

  return (
    <div style={{ 
      fontFamily: 'monospace', 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1>Postback Handler</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '15px', 
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginTop: '20px'
      }}>
        <p><strong>Status:</strong> {response.statusCode}</p>
        <p><strong>Response:</strong> {response.message}</p>
        {message && (
          <p><strong>Details:</strong> {message}</p>
        )}
      </div>
      
      {status === 'success' && (
        <div style={{ 
          backgroundColor: '#d4edda', 
          color: '#155724',
          padding: '15px', 
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          marginTop: '20px'
        }}>
          <h3>✅ Conversion Tracked Successfully</h3>
          <p>The user's earnings have been updated.</p>
        </div>
      )}
      
      {status === 'error' && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24',
          padding: '15px', 
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          marginTop: '20px'
        }}>
          <h3>❌ Error Processing Postback</h3>
          <p>{message}</p>
        </div>
      )}

      <div style={{ 
        backgroundColor: '#e2e3e5', 
        padding: '15px', 
        border: '1px solid #d6d8db',
        borderRadius: '4px',
        marginTop: '20px'
      }}>
        <h3>Debug Information</h3>
        <p><strong>App ID:</strong> {searchParams.get('appid') || 'Not provided'}</p>
        <p><strong>User ID:</strong> {searchParams.get('userid') || 'Not provided'}</p>
        <p><strong>Payout:</strong> {searchParams.get('payout') || 'Not provided'}</p>
        <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
      </div>
    </div>
  );
};

export default Postback;

