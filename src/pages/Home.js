import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [missions, setMissions] = useState();

    async function fetchMissions(){
        const resp = await fetch(`https://api.spacexdata.com/v3/launches`);
        const data = await resp.json();
        setMissions(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchMissions();

    }, []);

  return (
    <>
    <h1 className="text-5xl font-bold text-center mt-3">SpaceX</h1>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-5">
        { loading && "Loading..."}
        {
            missions && missions.map((mission) => (
            <div className='card w-full md:w-1/2 lg:w-1/2 p-4 mx-auto text-center'>
            <img className="w-full h-40" src={mission.links.mission_patch_small} alt={mission.mission_name} />
            
            <h3 className="text-2xl font-bold mt-4 ">{mission.mission_name}</h3>
        
            <h4 className="text-gray-700 mt-2">{mission.launch_year}</h4>
            
            
            <Link className="block mt-4 py-2 px-4 rounded-full bg-blue-500 text-white" to={`/mission/${mission.flight_number}`} key={mission.flight_number}>Read More</Link>
            
            </div>

        ))}
    </div>
    </>
  );
}
