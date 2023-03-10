import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import findUser from "../../utils/findUser.js";
export const UserProfile = ({users}) => {
  const { id } = useParams();
  const [inputField, setInput] = useState();
  const [user,setUser]=useState(findUser(users,id))
  const onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setInput(value);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/" + id,
      { message: inputField }
    );
    console.log(res);
  };
  const shareProfile=(e,url)=>{
    e.preventDefault()
    copy(url)
  }
  console.log(user.userName)
  return (
    <div className="container text-center py-5 my-5 text-center">
      <div className="card py-5 mb-5">
        <a href data-toggle="modal" data-target="#profile">
          <img src="/assets/avatar.png" className="avatar " alt="we" />
        </a>
        <h3 className="py-2 text-capitalize">{user.userName}</h3>
        <div className="container w-50 m-auto">
          <form method="post" onSubmit={submitForm}>
            <textarea
              className="form-control"
              cols={10}
              rows={9}
              placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"
              defaultValue={inputField}
              onChange={onChange}
            />
            <button className="btn btn-outline-info mt-3">
              <i className="far fa-paper-plane" /> Send
            </button>
          </form>
        </div>
      </div>
    
      <button
        data-toggle="modal"
        data-target="#share"
        className="btn btn-default-outline share "
       onClick={e=>shareProfile(e,window.location)}
      >
        <i className="fas fa-share-alt" /> Share Profile
      </button>
    </div>
  );
};
