import React from 'react'

function DataTable() {
  return (
    <div>
      <div className='container'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th colSpan='2'>Operation</th>
                </tr>
              </thead>
              <tbody>
                {users && users?.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <button className='del-button' onClick={() => { deleteEntry(user._id) }}>Delete</button>
                    </td>
                    <td>
                      <button className='edit-button' onClick={() => { editEntry(user) }}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default DataTable
