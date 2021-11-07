import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { Form, Input, Button } from 'antd';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    if(password !== confirmPassword) {
      return alert('비밀번호가 일치하지 않습니다.');
    }
    let body = {
      email: email,
      name: name,
      password: password,
      confirmPassword: confirmPassword
    }

    
    
    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success) {
          props.history.push('/login');
        } else {
          alert('Failed to sign up');
        }
      });
  }

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'calc(100vh - 46px)'
  }

  return (
    <div style={style}>
      <Form 
        onFinish={onSubmitHandler} 
        labelCol={{ span: 10 }} 
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input value={email} onChange={onEmailHandler}/>
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input value={name} onChange={onNameHandler}/>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password value={password} onChange={onPasswordHandler}/>
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password value={confirmPassword} onChange={onConfirmPasswordHandler}/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10, span: 16 }} >
          <Button type="primary" htmlType="submit">
            Sing Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterPage;