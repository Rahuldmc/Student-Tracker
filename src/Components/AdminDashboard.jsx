import React, { useState } from 'react'
import ViewStudents from './ViewStudents'
import AddStudent from './AddStudent'

const AdminDashboard = () => {
    const [page,setPage] = useState('View')

  return (
    <div className='dashboard-container'>
      <div className='navigation'>
        <a onClick={() => {setPage("View")}}>View</a>
        <a onClick={() => {setPage("Assign")}}>Assign Tasks</a>
        <a onClick={() => {setPage("Add")}}>Add Student</a>
      </div>
      <div className='page-container'>
        {
            page === 'View' ?
            <ViewStudents/>
            :
            page === 'Add' ?
            <AddStudent/>
            :
            <p>Assign Tasks</p>
        }

      </div>
    </div>
  )
}

export default AdminDashboard
