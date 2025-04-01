import React, { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

function Home() {
  const [workouts, setWorkouts] = useState([{ title: 'No Title' }]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:3500/api/workouts');
        console.log('response: ', response);
        const result = await response.json();
        console.log('result: ', result);

        if (response.ok && Array.isArray(result.data)) {
          setWorkouts(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkouts();
  }, []); // empty array. this effect will only run once

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
