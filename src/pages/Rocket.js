import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Rocket() {
  const [loading, setLoading] = useState(true);
  const [rocket, setRocket] = useState();
  const { flightNumber } = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  async function fetchTodo() {
    const resp = await fetch(`https://api.spacexdata.com/v3/launches/${flightNumber}`);
    const data = await resp.json();
    setRocket(data.rocket);
    setLoading(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setComments([...comments, comment]);
    setComment('');
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  if (rocket) {
    return (
      <div>
        <div className='mt-3 mx-3'>
        <Navigation />
        </div>
        <div className="border rounded-lg p-4 mx-auto mt-4">
          <h4 className="text-2xl font-bold">Rocket Name: {rocket.rocket_name}</h4>
          <p className="text-xl">Rocket Type: {rocket.rocket_type}</p>
          <h2 className="text-xl font-bold">First Stage</h2>
          <p className="text-xl">Core serial: {rocket.first_stage.cores[0].core_serial}</p>
          <h2 className="text-xl font-bold">Second stage</h2>
          <ul>
            {rocket.second_stage.payloads.map((payload) => (
              <li key={payload.payload_id} className="text-xl">Payload ID: {payload.payload_id}</li>
            ))}
          </ul>
          <p className="text-xl">Nationality: {rocket.second_stage.payloads[0].nationality}</p>
          <p className="text-xl">Payload Type: {rocket.second_stage.payloads[0].payload_type}</p>
          <p className="text-xl">Reference System: {rocket.second_stage.payloads[0].orbit_params.reference_system}</p>
        </div>

        <div className="border rounded-lg p-4 mt-4 mx-auto">
          <h2 className="text-2xl font-bold">Comment section</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className="border rounded-lg p-2 w-full"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <button
              type="submit"
              className="border rounded-lg p-2 mt-2 bg-blue-500 text-white"
            >
              Submit
            </button>
          </form>

          <div className="mt-4">
            {comments.map((c) => (
              <div key={c} className="text-xl">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading..</div>;
  }
}





