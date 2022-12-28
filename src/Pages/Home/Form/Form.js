import React from "react";
import { useForm } from "react-hook-form";
import './Form.css'
// import { useForm } from "react-hook-form";
const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
//    const handleForm = event =>{
//     event.preventDefault();
//     const form = event.target;
//     const text = form.message.value;
//     const img = form.file.value;
//     const status = {
//         text,
//         img
//     }
//     console.log(status)
//    }
const onSubmit = data =>{
   console.log(data)
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
          >
          </textarea>
          <div className="flex justify-between">
          <input {...register("img")} type="file" />
          <input className="btn btn-info" type="submit" />
          </div>
      </form>
      </div>
    </div>
  );
};

export default Form;
