import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BsSuitHeart } from 'react-icons/bs';

const PostDetails = () => {
  const data = useLoaderData();
  const [isActive, setIsActive] = useState(false);
//   const [isActive2, setIsActive2] = useState(false);

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
        <div className="card-actions">
          <div className="cursor-pointer select-none">
       {isActive? <BsFillSuitHeartFill onClick={()=>{
          setIsActive(!isActive)}}/>:
      <BsSuitHeart onClick={()=>{
          setIsActive(!isActive)}} />
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
