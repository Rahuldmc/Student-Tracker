import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const supabase = createClient(
        "https://dtfvlyohhnvpaiyxcnmi.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZnZseW9oaG52cGFpeXhjbm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NzMwMzIsImV4cCI6MjAyNTQ0OTAzMn0.FZuBlRtveZ3gDoev_tpkEyj3Ez1P1J9SJ8B8VuEEFhM");
    

        const onFinish = async (values) => {
            try {
              // Query the 'student' table to check if the username and password match
              const { data: studentData, error: studentError } = await supabase
                .from('users')
                .select('*')
                .eq('username', values.username)
                .single();
          
              if (studentError) {
                console.error('Error querying student data:', studentError);
              } else {
                if (studentData && studentData.password === values.password) {
                  console.log('Login successful!',studentData);
                  if(studentData.role === 'student'){
                  navigate('/student');
                  } else{
                    navigate('/admin')
                  }
                   
                } else {
                  console.error('Invalid username or password');
                  // Handle login error, e.g., display an error message to the user
                }
              }
            } catch (error) {
              console.error('Error:', error.message);
            }
          };
          

    return (
        <div>
            <Form
                name="normal_login"
                className="login-container"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
            <h1>Login Now</h1>

                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input className='input-container' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        className='input-container'
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-button">
                        Log in
                    </Button>
                    Or <a style={{ marginleft: '10px' }} href="/register">register now!</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
