import React from 'react';

function WorkoutList({ workouts, deleteWorkout, startEditing }) {
  return (
    <div>
      <h2>Workouts</h2>
      {workouts.map((workout) => (
        <div key={workout._id} className="workout-details">
          <h3>{workout.title}</h3>
          <p>Reps: {workout.reps}</p>
          <p>Load: {workout.load} kg</p>
          <p>{workout.createdAt}</p>
          <button className="btn" onClick={() => deleteWorkout(workout._id)}>
            Delete
          </button>
          <button className="btn" onClick={() => startEditing(workout)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default WorkoutList;
