import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Add({ employees, setEmployees, setIsAdding }) {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState(null);
  const [Experience, setExperience] = useState('');

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!username || !description || !email || !DOB || !Experience) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        username,
        description,
        email,
        DOB,
        Experience,
      });

      const newEmployee = response.data;

      setEmployees([...employees, newEmployee]);
      setIsAdding(false);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${username}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add User</h1>
        <div className="form-group">
          <label htmlFor="Username">Username</label>
          <input
            id="Username"
            type="text"
            ref={textInput}
            name="Username"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={description}
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="DOB">DOB</label>
          <input
            id="DOB"
            type="date"
            name="DOB"
            value={DOB}
            onChange={e => setDOB(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Experience">Experience</label>
          <select
            id="Experience"
            name="Experience"
            value={Experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="">Select Experience</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="form-group">
          <div style={{ marginTop: '30px' }}>
            <input type="submit" value="Add" />
            <input
              style={{ marginLeft: '12px' }}
              className="muted-button"
              type="button"
              value="Cancel"
              onClick={() => setIsAdding(false)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add;
