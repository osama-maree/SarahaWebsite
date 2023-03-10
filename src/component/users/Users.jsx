import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pagination from '../../utils/pagination.js'
import { Pagination } from '../pagination/Pagination.jsx'

export const Users = ({users}) => {
  const navigate=useNavigate()
    const [res,setRes]=useState(users)
    const [pageInfo,setPageInfo]=useState({
      pageNumber:0,
      pageSize:12
    })
    const searchUser=(e)=>{
        const {value}=e.target
        const arr=[]
        users.map(user=>{
            if(user.userName.toLowerCase().startsWith(value.toLowerCase())){
                arr.push(user)
            }
        })
        setRes(arr)
        setPageInfo({...pageInfo,pageNumber:0})
    }
    const changePageNumber=(page)=>{
      setPageInfo({...pageInfo,pageNumber:page})

    }
  return (
    <div className='container'>
      <input type="text"
      className='form-control'
      aria-label='username'
      placeholder='user name'
      aria-describedby='bassic-addon'
      onChange={searchUser}
      />
      <table className="table">
        <thead>
          <tr>
            <th className="col">#</th>
            <th className="col">Name</th>
            <th className="col"></th>
          </tr>
        </thead>
        <tbody>
           {pagination(res,pageInfo.pageNumber,pageInfo.pageSize).map((user, index) => ( <tr key={index}>
              <th scope="row">{1+index+(pageInfo.pageNumber*pageInfo.pageSize)}</th>
              <td>{user.userName}</td>
              <td>
                <button className='py-1 px-3' onClick={()=>navigate(`/user/${user._id}`)}>send Message</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination users={users} changePageNumber={changePageNumber} {...pageInfo}/>
    </div>
  );
}
