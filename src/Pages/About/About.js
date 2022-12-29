import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';

const About = () => {
    const {user} = useContext(AuthContext);
    const email = user?.email;

    // const url = `http://localhost:5000/users?email=${email}`;
    //fetch(`https://resale-server-side-seven.vercel.app/users/admin/${email}`)

    const {data: userData =[],refetch} = useQuery({
        queryKey:['userData',email],
        queryFn: async () =>{
            const res = await fetch(`http://localhost:5000/users?email=${email}`);
            const data = await res.json();
            return data;
        }
    })

    
    return (
        <div className='flex justify-center'>
            <div className='mt-12'>
            <h2>About{userData.length}</h2>
            <div>
                {
                    userData.map((userInfo )=><div key={userInfo._id}>

                    {/* <form>
                        <input type="text" defaultValue={buyer?.name} />
                    </form> */}
                    <h3>{userInfo.name}</h3>
                    </div>)
                }
            </div>
        </div>
        </div>
    );
};

export default About;