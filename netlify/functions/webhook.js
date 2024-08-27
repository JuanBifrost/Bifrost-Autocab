// netlify/functions/webhook.js
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const data = JSON.parse(event.body);

  console.log('Webhook data received:', data);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Webhook received successfully' }),
  };
};
