import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const FatSecretSearch  = () => {
  const [response, setResponse] = useState(null);

  const makeRequest = async () => {
    const url = 'https://platform.fatsecret.com/rest/server.api';
    const method = 'POST';

    const consumerKey = '38eb76aab10b43c8b1ddaff6b7e8c080';
    const consumerSecret = '03ab52bf12394ebbaddfde92a722ef1d';
    const accessToken = ''; // Optional
    const accessSecret = ''; // Optional

    const params = {
      method: 'foods.search',
      format: 'json',
      search_expression: 'apple',
      oauth_consumer_key: consumerKey,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_nonce: Math.random().toString(36).substring(2),
      oauth_version: '1.0',
    };

    const baseParams = Object.keys(params)
      .sort()
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    const baseString = [
      method.toUpperCase(),
      encodeURIComponent(url),
      encodeURIComponent(baseParams)
    ].join('&');

    const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(accessSecret)}`;
    const signature = CryptoJS.HmacSHA1(baseString, signingKey);
    const signatureBase64 = CryptoJS.enc.Base64.stringify(signature);
    const oauthSignature = encodeURIComponent(signatureBase64);

    const finalParams = { ...params, oauth_signature: oauthSignature };

    const formBody = Object.keys(finalParams)
      .map(key => `${key}=${finalParams[key]}`)
      .join('&');

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error.message });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>FatSecret API OAuth 1.0 Test</h1>
      <button onClick={makeRequest}>Send Test Request</button>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>
        {response ? JSON.stringify(response, null, 2) : 'Click the button to make a request.'}
      </pre>
    </div>
  );
};

export default FatSecretSearch;
