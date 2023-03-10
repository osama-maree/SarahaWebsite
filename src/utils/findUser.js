const findUser=(users,userId)=>{
    const userIndex=users.findIndex(user => user._id === userId)
   
    return userIndex===-1?{}:users[userIndex]
}

export default findUser