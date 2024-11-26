import React, { useState, useEffect } from 'react';
import NotesTable from './NotesTable';

const UserProfile = ({ onLogout }) => {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/user', {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch(() => setError('Failed to fetch user data'));
    }, []);

    const handleUpdate = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
                credentials: 'include',
            });
            if (response.ok) {
                setSuccess('Profile updated successfully');
            } else {
                setError('Failed to update profile');
            }
        } catch {
            setError('Something went wrong.');
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <input
                type="text"
                value={user.first_name}
                onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            />
            <input
                type="text"
                value={user.last_name}
                onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            />
            <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
                type="text"
                value={user.phone_number}
                onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
            />
            <button onClick={handleUpdate}>Update Profile</button>
            <button onClick={onLogout}>Logout</button>

            <NotesTable />
        </div>
    );
};

export default UserProfile;
