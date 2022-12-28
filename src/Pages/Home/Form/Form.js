import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import "./Form.css";
// import { useForm } from "react-hook-form";
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageHostKey = process.env.REACT_APP_imagebb_key;
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = (data) => {
    const imageData = data.image[0];
    const text = data.text;
    const formData = new FormData();
    formData.append('image',imageData)

    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`
    fetch(url,{
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(imageUpData =>{
        if(imageUpData.success){
            const posts = {
              status:text,
              image:imageUpData.data.url,
              name:user?.displayName,
              like:0,
            }

            console.log(posts)

            fetch('http://localhost:5000/posts',{
                        method:"POST",
                        headers:{
                            'content-type':"application/json"
                        },
                        body:JSON.stringify(posts)
                    })
                    .then(res => res.json())
                    .then(result => {
                      navigate('/media')
                        // console.log(result)
                    })

        }
    })
  };

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div>
        <h3>This is intro and others</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("text")}
            rows="7"
            placeholder="Your message"
            required
          ></textarea>
          <div className="flex justify-between">
            <input {...register("image")} type="file" />
            {
              user?.uid ?
                 <input className="btn btn-info" type="submit" /> :
                 <Link to='/login'><button className="btn btn-outline btn-error">Login to post</button></Link>
            }
            {/* <input className="btn btn-info" type="submit" /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
