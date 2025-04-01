import React from 'react';

function EditWorkoutForm({ editWorkout, setEditWorkout, updateWorkout }) {
  return (
    <div>
      <h2>Edit Workout</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={editWorkout.title}
        onChange={(e) =>
          setEditWorkout({ ...editWorkout, title: e.target.value })
        }
      />
      <input
        type="number"
        name="reps"
        placeholder="Reps"
        value={editWorkout.reps}
        onChange={(e) =>
          setEditWorkout({ ...editWorkout, reps: e.target.value })
        }
      />
      <input
        type="number"
        name="load"
        placeholder="Load (kg)"
        value={editWorkout.load}
        onChange={(e) =>
          setEditWorkout({ ...editWorkout, load: e.target.value })
        }
      />
      <button onClick={updateWorkout}>Update Workout</button>
      <button onClick={() => setEditWorkout(null)}>Cancel</button>
    </div>
  );
}

export default EditWorkoutForm;
