import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import BookingModal from '../BookingModal/BookingModal';

const About = () => {
  const [userDetails, setUserDetails] = useState();
  
  const { user } = useContext(AuthContext);

  const {
    data: userData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://social-site-server-bice.vercel.app/usersQueryEmail?email=${user?.email}`
      );
      const data = await res.json();
      setUserDetails(data);
      console.log(data);
      return data;
    },
  });


    // if(isLoading){
    //   return (
    //     <div className="flex items-center justify-center">
    //         <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    //           <span className="visually-hidden">Loading...</span>
    //         </div>
    //       </div>
    //   )
    // }

    return (
      <div className="flex shadow-2xl p-16 justify-center">
      <div className="">
        <div className="lex">
          <div  className="w-full p-7">
            <h2 className="text-2xl font-extrabold mb-12 text-center">Profile</h2>

            {userDetails?.map((user) => (
              <div className='shadow-xl mb-12 p-5' key={user._id}>
                <form>
                  <div className="">
                    <label className="label">
                      <span className="label-text font-extrabold">Name</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={user.name}
                      // className="border px-3 py-2 w-full max-w-xs"
                      className="w-full border border-black bookingModalFormInput"
                    />
                  </div>
                  <div className="form-control my-6 w-full max-w-xs">
                    <label className="label">
                      <span className="label-text font-extrabold">Email</span>
                    </label>
                    <input
                      defaultValue={user.email}
                      type="email"
                      disabled
                      className="w-full border border-black bookingModalFormInput"
                    />
                  </div>
                  <div className="form-control my-6 w-full max-w-xs">
                    <label className="label">
                      <span className="label-text font-extrabold">
                        University/School/College
                      </span>
                    </label>
                    <input
                      defaultValue={user.university}
                      disabled
                      type="text"
                      className="w-full border border-black bookingModalFormInput"
                    />
                  </div>
                  <div className="form-control my-6 w-full max-w-xs">
                    <label className="label">
                      <span className="label-text font-extrabold">Address</span>
                    </label>
                    <input
                      defaultValue={user.address}
                      disabled
                      type="text"
                      className="w-full border border-black bookingModalFormInput"
                    />
                  </div>
                </form>
              </div>
            ))}

            <label htmlFor="my-modal-3" className=" bg-red-400 p-2  font-bold rounded cursor-pointer btn-xs">
              Update Profile
            </label>
            <BookingModal
              userData={userData}
              userDetails={userDetails}
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