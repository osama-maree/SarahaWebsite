import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import findUser from "../../utils/findUser.js";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
export const Proifle = ({ user, users }) => {
  const [profileuser, setProfileuser] = useState({});
  const [messages, setMessages] = useState([]);
  const getUser = () => {
    const decoded = jwtDecode(user);
    setProfileuser(findUser(users, decoded.id));
  };
  const getMessage = async () => {
    const { data } = await axios.get(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages",
      {
        headers: {
          token: `tariq__${user}`,
        },
      }
    );
    setMessages(data.messages);
  };
  useEffect(() => {
    getUser();
    getMessage();

    getMessage();
  }, []);
  const deleteMessage = async (id) => {
    const res = await axios.delete(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/" + id,
      {
        headers: {
          token: `tariq__${user}`,
        },
      }
    );
    toast.success("Delete Success");
    getMessage();
  };
  const shareProfile = (e, url) => {
    e.preventDefault();
    copy(url);
  };
  return (
    <>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card pt-5">
          <a href data-toggle="modal" data-target="#profile">
            <img src="assets/avatar.png" className="avatar " alt="osam" />
          </a>
          <h3 className="py-2">{profileuser.userName}</h3>
          <button
            data-toggle="modal"
            data-target="#share"
            className="btn btn-default-outline share "
          >
            <i
              className="fas fa-share-alt"
              onClick={(e) => shareProfile(e, window.location)}
            />{" "}
            Share Profile
          </button>
        </div>
      </div>
      <div className="container text-center my-5 text-center">
        {messages.length === 0 ? (
          <div className="row">
            <div className="col-md-12">
              <div className="card py-5">
                <p>You don't have any messages... </p>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, ind) => (
            <div className="row" key={ind}>
              <div className="col-md-12">
                <div className="card py-5 position-relative">
                  <p>{message.text} </p>
                  <div className="delete">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteMessage(message._id)}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
