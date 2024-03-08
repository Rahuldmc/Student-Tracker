import { createClient } from '@supabase/supabase-js';
import { Button, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ViewStudents = () => {

  const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Dept',
      dataIndex: 'dept',
      key: 'dept',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      width: '250px',
      render: (record) => 
      <div className='actions-container'>
        {/* <a onClick={() => deleteData(record.Emp_Id)}>Delete</a> */}
        {/* {/* <a onClick={() => {navigate(`/Edit/${record.Emp_Id}`, {state : {record}})}}>Edit</a> */}
        <Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={(value) => handleChange(value)}
            options={[
              { value: 'Frontend', label: 'Frontend' },
              { value: 'Backend', label: 'Backend' },
              { value: 'Database Connection', label: 'Database Connection' },
              { value: 'Hosting Service', label: 'Hosting Service' },
            ]}
          />
        <a onClick={() => assignTask(record.username,task)} style={{marginLeft:'15px'}}>Assign</a>
      </div>,
    },
  ];
  const [studentData,setStudentData] = useState([])
  const navigate = useNavigate();

  const supabase = createClient(
    "https://dtfvlyohhnvpaiyxcnmi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZnZseW9oaG52cGFpeXhjbm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NzMwMzIsImV4cCI6MjAyNTQ0OTAzMn0.FZuBlRtveZ3gDoev_tpkEyj3Ez1P1J9SJ8B8VuEEFhM");

    const assignTask = async (username, tasks_assigned) => {
      try {
        // Insert data into the 'tasks' table
        const { data, error } = await supabase
          .from('tasks')
          .insert([
            { username, tasks_assigned }
          ]);
    
        if (error) {
          console.error('Error inserting task:', error);
        } else {
          console.log('Task assigned successfully:', data);
          // Handle success, e.g., show a success message to the user
        }
      } catch (error) {
        console.error('Error assigning task:', error.message);
      }
    };


    const [task,setTask] = useState("")
    const handleChange = (value) => {
      setTask(value)
      console.log(task)
    };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the 'students' table, excluding 'username' and 'password'
        const { data, error } = await supabase
          .from('students')
          .select('id, name, age, dept, year,username') // Include all the columns you want to fetch, excluding 'username' and 'password'
          .order('id', { ascending: true })
           // Adjust the limit based on your needs

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          console.log('Fetched data:', data);
          setStudentData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      <Table
            dataSource={studentData}
            columns={columns}
            rowKey="Emp_Id" // Specify a unique key for each row
            pagination={{ pageSize: 10 }} // You can adjust the page size as needed
        />
    </div>
  )
}

export default ViewStudents
