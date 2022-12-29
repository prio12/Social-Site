import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ userData, isLoading, refetch }) => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const university = form.university.value;
    const address = form.address.value;

    const update = {
      name: name,
      email: email,
      university: university,
      address: address,
    };

    fetch(`http://localhost:5000/users/${userData._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application.json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          toast.success("Profile Updated");
          navigate('/message')
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
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit}>
            <input 
            name="name"
            type="text"
            placeholder="Your Name"
            className="input w-full input-bordered"
            />
            <input 
            name="email"
            type="email"
            placeholder="Your Email"
            className="input w-full input-bordered"
            />
            <input 
            name="university"
            type="text"
            placeholder="Your University"
            className="input w-full input-bordered"
            />
            <input 
            name="address"
            type="text"
            placeholder="Your Address"
            className="input w-full input-bordered"
            />
            <input 
           
            type="submit"
            value='Submit'
            className="input w-full "
            />

          </form>
          
        </div>
      </div>
    </>
  );
};

export default BookingModal;
