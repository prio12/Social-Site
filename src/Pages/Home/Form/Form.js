import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import DevTypeWriter from "../../DevTypeWriter/DevTypeWriter";
import Image from '../../../assets/image/Vero-icon-192.png'
import "./Form.css";
// import { useForm } from "react-hook-form";
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageHostKey = process.env.REACT_APP_imagebb_key;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const imageData = data.image[0];
    const text = data.text;
    const formData = new FormData();
    formData.append("image", imageData);

    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageUpData) => {
        if (imageUpData.success) {
          const posts = {
            status: text,
            image: imageUpData.data.url,
            name: user?.displayName,
            like: 0,
          };

          console.log(posts);

          fetch("https://social-site-server-bice.vercel.app/posts", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(posts),
          })
            .then((res) => res.json())
            .then((result) => {
              navigate('/media')
              
              // console.log(result)
            });
        }
      });
  };

  return (
    <div className="grid gap-3 p-5 mb-24  grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div className="shadow-2xl p-5">
        <div
          className="hero"
          style={{
            backgroundImage:`url(${Image})`,
            height:"350px"
          }}
        >
          <div  className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center ">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl text-info font-extrabold">VERO</h1>
              <DevTypeWriter></DevTypeWriter>
              <button className="btn btn-error btn-outline mt-5">Get Started</button>
            </div>
          </div>
        </div>
        {/* <h3>This is intro and others</h3> */}
        {/* <DevTypeWriter></DevTypeWriter> */}
      </div>
      <div className="shadow-2xl p-5">
        <form style={{height:"350px"}} onSubmit={handleSubmit(onSubmit)}>
          <textarea
            className="bg-slate-100"
            {...register("text")}
            rows="8"
            placeholder="What's on your mind?"
            required
          ></textarea>
          <div className="flex justify-between">
            <input className="shadow-xl" {...register("image")} type="file" />
            {user?.uid ? (
              <input className="btn  btn-outline" type="submit" />
            ) : (
              <Link to="/login">
                <button className="btn btn-outline btn-error">
                  Login To Post
                </button>
              </Link>
            )}
            {/* <input className="btn btn-info" type="submit" /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
