import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const TaskAssignment = () => {
    const location = useLocation();
    const {record} = location.state
    console.log(record)
    const [studentData,setStudentData] = useState();
    useEffect(() => {
        if (record) {
          setStudentData(record);
        }
      }, [record]);
  return (
    <div>   
      
    </div>
  )
}

export default TaskAssignment
