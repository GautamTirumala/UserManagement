import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserDetails() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div className="container mt-4">
            <h2>User Details</h2>
            {loading ? (
                <p>Loading...</p>
            ) : user ? (
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" value={user.username} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" value={user.email} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="experience">Experience</label>
                        <input type="text" className="form-control" id="experience" value={user.Experience} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" rows="3" value={user.description} readOnly></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="text" className="form-control" id="dob" value={user.DOB} readOnly />
                    </div>
                    {/* Add other fields here */}
                </form>
            ) : (
                <p>No user found</p>
            )}
        </div>
    );
}

export default UserDetails;
