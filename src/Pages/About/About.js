import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import BookingModal from '../BookingModal/BookingModal';

const About = () => {
    const {user} = useContext(AuthContext);
    console.log(user)
    // const email = user?.email;
    console.log(user?.email)

    // const url = `http://localhost:5000/users?email=${user?.email}`;
    // console.log(url)
    
    const {data:userData ={}, refetch, isLoading} = useQuery({
        queryKey:['userData',user?.email],
        queryFn: async () =>{
            const res = await fetch(`http://localhost:5000/users/data?email=${user?.email}`);
            const data = await res.json();
            console.log(data)
            return data;
        }
    })
    return (
        <div className='flex justify-center'>
            <div className='mt-12'>
            <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-3xl text-center">Profile</h2>
        <form>
          <div className="form-control my-6 w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              disabled
              defaultValue={userData?.name}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control my-6 w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
            defaultValue={userData?.email}
              type="email"
              disabled
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control my-6 w-full max-w-xs">
            <label className="label">
              <span className="label-text">University/School/College</span>
            </label>
            <input
            defaultValue={userData?.university? userData.university:"No institution added"}
            disabled
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control my-6 w-full max-w-xs">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
            defaultValue={userData?.address? userData.address:"No address added"}
            disabled
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </form>
        <label htmlFor="my-modal-3" className="btn">Update Profile</label>
        <BookingModal
        userData={userData}
        refetch={refetch}
        isLoading={isLoading}
        ></BookingModal>
      </div>
    </div>
        </div>
        </div>
    );
};

export default About;