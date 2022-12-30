import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [isLoading, setISLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setISLoading(true);
    fetch("https://social-site-server-bice.vercel.app/trending")
      .then((res) => res.json())
      .then((data) => {
        setTrendingData(data);
        setISLoading(false);
      });
  }, []);
  return (
    <div>
      <h2 className="text-center text-2xl mb-16 font-extrabold">
        Now Trending <span className="text-blue-600">!!!</span>{" "}
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div
        data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"

        className="grid grid-cols-1 mb-32 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {trendingData.map((posts) => (
            <div key={posts._id} className="card shadow-2xl">
              <div className="card-body">
                <div className="flex mb-5 justify-between">
                  <h2 className="text-xl p-4 badge badge-warning font-bold">{posts.name}</h2>
                  <div className="badge badge-primary font-extrabold">
                    {posts.like} Likes!!
                  </div>
                </div>
                {/* <textarea className="mt-12" disabled name="" id="">
                  {posts.status}
                </textarea> */}
                <p className="badge badge-outline p-10">{posts.status.substring(0, 50)}...</p>
              </div>
              <figure className="mb-5">
                <img
                 
                  style={{ height: "200px", width:"300px"}}
                  src={posts.image}
                  alt="images"
                />
              </figure>
              {/* <div className="card-actions justify-end">
                  <Link to={`/posts/${posts._id}`}><button className="btn btn-outline ">See More</button></Link>
                  </div> */}

              <Link className="text-center mb-5" to={`/posts/${posts._id}`}>
                <button className="btn btn-outline ">See More</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;
