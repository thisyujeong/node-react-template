import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage(props) {
  useEffect(() => {
    axios.get('/api/hello')
      .then(response => console.log(response.data));
  }, []);

  const onClickHandler = (e) => {
    e.preventDefault();
    axios.get(`api/users/logout`)
    .then(response => {
      console.log(response.data);
      if(response.data.success) {
        props.history.push('/login');
      } else {
        alert('Failed to sign out.');
      }
    })
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', with: '100%', height: '100vh' }}>
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;