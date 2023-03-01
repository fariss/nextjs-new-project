import React, { useState } from 'react';
import axios from 'axios';

const Transcript = () => {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');

  const getTranscript = async () => {
    const videoId = url.split('=')[1];
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20contentDetails%2C%20statistics&id=${videoId}&key=${process.env.API_KEY}`;
    
    try {
      const response = await axios.get(apiUrl);
      const captionsUrl = response.data.items[0].contentDetails.caption;
      const captionsResponse = await axios.get(captionsUrl);
      setTranscript(captionsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Enter YouTube URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={getTranscript}>Get Transcript</button>
      {transcript && <div dangerouslySetInnerHTML={{ __html: transcript }} />}
    </div>
  );
};

export default Transcript;