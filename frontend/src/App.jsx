import { useState, useEffect } from 'react';
import axios from 'axios';
import AddWorkoutForm from './components/AddWorkoutForm';
import EditWorkoutForm from './components/EditWorkoutForm';
import WorkoutList from './components/WorkoutList';
import './assets/fonts/fonts.css';
import './index.css';

function App() {
  const [workouts, setWorkouts] = useState([]);

  const [editWorkout, setEditWorkout] = useState(null);

  const [newWorkout, setNewWorkout] = useState({
    // newWorkout an object with three properties: title, reps, and load
    // that are initially set to empty strings. POST request to the API
    title: '',
    reps: '',
    load: '',
  });

  const API_URL = 'https://mern-proj-pae3.onrender.com';

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(API_URL);
        setWorkouts(response.data.data);
      } catch (error) {
        console.error('Error fetching workouts:', error.message);
      }
    };
    fetchWorkouts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewWorkout({ ...newWorkout, [name]: value });
  };

  const addWorkout = async () => {
    try {
      const response = await axios.post(API_URL, newWorkout);
      setWorkouts([response.data.data, ...workouts]); // Adds the new workout to the beginning of the workouts array
      setNewWorkout({ title: '', reps: '', load: '' }); // Resets the newWorkout state to its initial values
    } catch (error) {
      console.error('Error adding workout!', error.message);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // Sends DELETE request to the backend
      setWorkouts(workouts.filter((workout) => workout._id !== id)); // Updates state to remove the deleted workout
    } catch (error) {
      console.error('Error deleting workout:', error.message);
    }
  };

  const startEditing = (workout) => {
    setEditWorkout(workout);
  };

  const updateWorkout = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/${editWorkout._id}`,
        editWorkout
      );
      setWorkouts(
        workouts.map((workout) =>
          workout._id === editWorkout._id ? response.data.data : workout
        )
      );
      setEditWorkout(null);
    } catch (error) {
      console.error('Error updating workout:', error.message);
    }
  };

  return (
    <>
      <div className="header">
        <img src="/images/girl.png" alt="girl" />
        <h1 style={{ fontFamily: 'myFont' }} className="tracker">
          Workout Tracker
        </h1>
      </div>
      {/* <hr></hr> */}
      <div className="add-workout">
        <div>
          <AddWorkoutForm
            newWorkout={newWorkout}
            handleInputChange={handleInputChange}
            addWorkout={addWorkout}
          />
          {editWorkout && (
            <EditWorkoutForm
              editWorkout={editWorkout}
              setEditWorkout={setEditWorkout}
              updateWorkout={updateWorkout}
            />
          )}
        </div>

        <WorkoutList
          className="workout-details"
          workouts={workouts}
          deleteWorkout={deleteWorkout}
          startEditing={startEditing}
        />
      </div>
    </>
  );
}

export default App;
