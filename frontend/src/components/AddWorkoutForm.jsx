import React, { useState } from 'react';

function AddWorkoutForm({ newWorkout, handleInputChange, addWorkout }) {
  const [error, setError] = useState(''); // State to store the error message

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!newWorkout.title || !newWorkout.reps || !newWorkout.load) {
      setError('All fields are required'); // Set the error message
      return;
    }

    setError(''); // Clear the error message if validation passes
    addWorkout();
  };

  return (
    <form className="border-form" onSubmit={handleSubmit}>
      <h2>Add Workout</h2>
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newWorkout.title}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="reps"
          placeholder="Reps"
          value={newWorkout.reps}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="load"
          placeholder="Load (kg)"
          value={newWorkout.load}
          onChange={handleInputChange}
        />
      </div>
      {error && <div className="error">{error}</div>}{' '}
      <button type="submit">Add Workout</button>
    </form>
  );
}

export default AddWorkoutForm;
