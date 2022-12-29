import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BsSuitHeart } from 'react-icons/bs';
// import { FcLike } from 'react-icons/fc';
// import { FcLike } from 'react-icons/fc';

const PostDetails = () => {
  const data = useLoaderData();
  const [like,setLike] = useState(data.like)
  const [isActive, setIsActive] = useState(false);

  const likeHandler = () =>{
    setLike(isActive ? like - 1 : like + 1)
    setIsActive(!isActive)
  }
  
  return (
    <div className="flex  justify-center">
        <div className="card mt-12  shadow-2xl">
      <figure className="px-10 pt-10">
        <img
          style={{height:'300px'}}
          src={data.image}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{data.name}</h2>
        <p>{data.status}</p>
        <span>{like} People liked this</span>
        <div className="card-actions">
          <div className="cursor-pointer text-2xl select-none">
       {isActive? <BsFillSuitHeartFill  onClick={likeHandler}/>:
      <BsSuitHeart onClick={likeHandler} />
           }
      </div>
        </div>
        <textarea className="mt-3"
            // {...register("text")}
            rows="7"
            placeholder="Add a Comment"
            required
          ></textarea>
      </div>
    </div>
    </div>
  );
};

export default PostDetails;
