import React, { useState, useEffect } from 'react';

const NotesTable = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/notes', { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => setNotes(data))
            .catch(() => console.error('Failed to fetch notes'));
    }, []);

    const addNote = async () => {
        const response = await fetch('http://localhost:5000/api/notes/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note_text: newNote }),
            credentials: 'include',
        });
        if (response.ok) {
            setNotes([...notes, { note_text: newNote }]);
            setNewNote('');
        }
    };

    return (
        <div>
            <h3>Your Notes</h3>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>{note.note_text}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={addNote}>Add Note</button>
        </div>
    );
};

export default NotesTable;
