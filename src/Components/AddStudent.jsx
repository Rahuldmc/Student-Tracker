import { createClient } from '@supabase/supabase-js';
import React, { useState } from 'react'
import { Form, Input, Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        age: 0,
        dept: '',
        year: 0,
        username: '',
        password: '',
      });
    
      const supabase = createClient(
        "https://dtfvlyohhnvpaiyxcnmi.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZnZseW9oaG52cGFpeXhjbm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NzMwMzIsImV4cCI6MjAyNTQ0OTAzMn0.FZuBlRtveZ3gDoev_tpkEyj3Ez1P1J9SJ8B8VuEEFhM");
    
      const onFinish = async (values) => {
        try {
          // Insert data into the 'student' table
          const { data: newStudent, error: studentError } = await supabase
          .from('students')
          .upsert([
            {
              name: values.name,
              age: values.age,
              dept: values.dept,
              year: values.year,
              username: values.username,
              password: values.password,
            },
          ]);
        
        if (studentError) {
          console.error('Error inserting data into student table:', studentError);
        } else {
          console.log('Successfully inserted data into student table:', newStudent);
        
          // Make another API request to update username and password in another table
          const { data: updatedData, error: updateError } = await supabase
            .from('users')
            .upsert({
              username: values.username,
              password: values.password,
              role:'student'
            })
            .match({ /* Specify the condition to match the row you want to update */ });
        
          if (updateError) {
            console.error('Error updating data in another_table:', updateError);
          } else {
            console.log('Successfully updated data in another_table:', updatedData);
            navigate('/admin')
          }
        }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
    
      const handleChange = (value, fieldName) => {
        setData((prevData) => ({
          ...prevData,
          [fieldName]: value,
        }));
      };
    

  return (
    <div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        className='student-add-container'
      >
        <h1 style={{textAlign: 'center'}}>Add Student</h1>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[
            { required: true, message: 'Please enter your age!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value && value < 17) {
                  return Promise.reject('Age must be 17 or above!');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="dept"
          rules={[{ required: true, message: 'Please select your department!' }]}
        >
          <Select
            defaultValue="0"
            style={{ width: 120 }}
            onChange={(value) => handleChange(value, 'dept')}
            options={[
              { value: 'cse', label: 'CSE' },
              { value: 'It', label: 'IT' },
              { value: 'aids', label: 'AIDS' },
              { value: 'csbs', label: 'CSBS' },
              { value: 'eee', label: 'EEE' },
              { value: 'ece', label: 'ECE' },
              { value: 'mech', label: 'Mech' },
              { value: 'mct', label: 'MCT' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Year"
          name="year"
          rules={[{ required: true, message: 'Please enter your year!' }]}
        >
          <Select
            defaultValue="0"
            style={{ width: 120 }}
            onChange={(value) => handleChange(value, 'year')}
            options={[
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddStudent
