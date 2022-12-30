import React, { useEffect, useState } from 'react';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BsSuitHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Media = () => {

    // const postsData = useLoaderData()
    const [postData, setPostData] = useState([])
    const [isLoading, setISLoading] = useState(false);
    //icons
   

    useEffect(() =>{
       setISLoading(true)
        fetch('https://social-site-server-bice.vercel.app/posts')
        .then(res => res.json())
        .then(data => {
            setPostData(data)
            setISLoading(false)
        })
    },[])
    return (
        <div>
            <h2 className='text-center text-2xl font-extrabold mb-12'>Timeline</h2>

           {
            isLoading ? <div className="flex items-center justify-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div> :
            <div className='grid p-4 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {
                postData.map(posts =><div key={posts._id} className="card my-12 shadow-xl card-compact">
                <figure><img src={posts.image} style={{height:'250px'}} alt="Shoes" /></figure>
                <div className="card-body">
                  <h2 className="text-xl badge badge-accent p-4 text-center mb-3 font-bold">{posts.name}</h2>
                  <p className='badge my-5 p-10 badge-outline'>{posts.status.substring(0, 50)}...</p>
                  <div className='flex justify-between'>
                  <Link to={`/posts/${posts._id}`}><button className="btn btn-outline ">See More</button></Link>
                  </div>
                </div>
              </div>)
            }
           </div>
           }
        </div>
    );
};

export default Media;