import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';

function NavBar(props) {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth())
    .then(response => {
      if(response.payload.isAuth) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, [dispatch, isLogin]);
  
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
    <header>
      <Menu mode="horizontal" >
        <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
        { !isLogin && <Menu.Item key="register"><Link to="/register">Register</Link></Menu.Item> }
        <Menu.Item key="sign" style={{ marginLeft: 'auto' }}>
          { 
            isLogin ? <Button type="primary" onClick={onClickHandler}>Logout</Button> : 
            <Button type="primary"><Link to="/login">Login</Link></Button> 
          }
        </Menu.Item> 
      </Menu>
    </header>
  );
}

export default withRouter(NavBar);
