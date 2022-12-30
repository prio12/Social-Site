import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './BookingModal.css'

const BookingModal = ({ userDetails, userData, isLoading, refetch }) => {
  
  const userEmail = userData[0]?.email;

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const university = form.university.value;
    const address = form.address.value;

    const update = {
      name: name,
      university: university,
      address: address,
    };

    console.log(update)

    fetch(`https://social-site-server-bice.vercel.app/usersQueryEmail?email=${userEmail}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          toast.success("Profile Updated");
          navigate("/");
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="cursor-pointer btn-xs absolute right-2 top-2"
          >
            ✕
          </label>

          {userDetails?.map((user) =><div key={user._id}>
            <form className="m-3" onSubmit={handleSubmit}>
            <input 
      
            defaultValue={user.name}
            type="text"
            name="name"
            className="w-full border border-black bookingModalFormInput"
            />
            <input 
            type="email"
            disabled
            defaultValue={user.email}
            className="w-full border border-black bookingModalFormInput"
            />
            <input 
            name="university"
            type="text"
            defaultValue={user.university}
            className="w-full border border-black bookingModalFormInput"
            />
            <input 
            name="address"
            type="text"
            defaultValue={user.address}
            className="w-full border border-black bookingModalFormInput"
            />
            <input 
           
            type="submit"
            value='Submit'
            className="input w-full btn btn-outline btn-error "
            />

          </form>
          </div>)}
          
          
        </div>
      </div>
    </>
  );
};

export default BookingModal;
