import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
    const id = selectedEmployee._id;
    const [username, setusername] = useState(selectedEmployee.username);
    const [description, setdescription] = useState(selectedEmployee.description);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [Experience, setExperience] = useState(selectedEmployee.Experience);
    const [DOB, setDOB] = useState(selectedEmployee.DOB);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!username || !description || !email || !Experience || !DOB) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }

        const employee = {
            id,
            username,
            description,
            email,
            Experience,
            DOB,
        };

        try {
            console.log(employee)
            const response = await axios.patch(`http://localhost:5000/api/users/${id}`, employee);
            const updatedEmployee = response.data;

            // Update employees array correctly without mutating it
            const updatedEmployees = employees.map(emp =>
                emp._id === id ? updatedEmployee : emp
            );

            setEmployees(updatedEmployees);
            setIsEditing(false);

            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `${updatedEmployee.username}'s data has been updated.`,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error updating user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update user data. Please try again.',
                showConfirmButton: true,
            });
        }
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Employee</h1>
                <label htmlFor="username">First Name</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setusername(e.target.value)}
                />
                <label htmlFor="description">Last Name</label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={e => setdescription(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="Experience">Experience </label>
                <input
                    id="Experience"
                    type="text"
                    name="Experience"
                    value={Experience}
                    onChange={e => setExperience(e.target.value)}
                />
                <label htmlFor="DOB">DOB</label>
                <input
                    id="DOB"
                    type="date"
                    name="DOB"
                    value={DOB}
                    onChange={e => setDOB(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsEditing(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit