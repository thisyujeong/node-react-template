import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage(props) {
  useEffect(() => {
    axios.get('/api/hello')
      .then(response => console.log(response.data));
  }, []);

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'calc(100vh - 46px)'
  }
  
  return (
    <div style={style}>
      <h2>Hello <strong style={{color: '#1890ff'}}>Node-React-Template!</strong></h2>
    </div>
  );
}

export default LandingPage;