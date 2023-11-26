import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEdit = (id) => {
        console.log(id)
        const employee = employees.find((employee) => employee._id === id);
        setSelectedEmployee(employee);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        console.log(id)
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            isConfirmed: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            debugger
            if (result) {
                try {
                    await axios.delete(`http://localhost:5000/api/users/${id}`);
                    const updatedEmployees = employees.filter((employee) => employee._id !== id);

                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Employee data has been deleted.',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    setEmployees(updatedEmployees);
                } catch (error) {
                    console.error('Error deleting employee:', error);
                }
            }
        });
    };

    return (
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header setIsAdding={setIsAdding} />
                    <List
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    );
}

export default Dashboard;
