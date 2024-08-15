# Backend test softphone
This is for test CRUD with Softphone Project.

### Recent Calls API Integration Guide
This API provides CRUD operations for managing recent calls in the application. Below are the endpoints available and how to use them from the frontend.

## `API Endpoints`
1. Create a New Recent Call

- Endpoint: POST /api/recentCalls
- Description: Creates a new recent call entry.
- Request Body: JSON object containing the call details.
- Response: JSON object of the created call.

Example Request:
```js
const response = await fetch('http://localhost:5000/api/recentCalls', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: '12345',
        name: {
            displayName: 'John Doe',
            date: new Date().toISOString(),
            status: 'call',
        },
        target: 'John Doe'
    }),
});

const data = await response.json();
console.log('New call created:', data);
```
2. Retrieve All Recent Calls

- Endpoint: GET /api/recentCalls
- Description: Retrieves a list of all recent calls.
- Response: Array of JSON objects, each representing a recent call.

```js
const response = await fetch('http://localhost:5000/api/recentCalls');
const data = await response.json();
console.log('All recent calls:', data);
```
3. Retrieve a Specific Recent Call by ID

- Endpoint: GET /api/recentCalls/:id
- Description: Retrieves the details of a specific recent call by its ID.
- Parameters:
    - `:id` - The ID of the recent call to retrieve.
- Response: JSON object representing the recent call.
```js
const callId = '12345';
const response = await fetch(`http://localhost:5000/api/recentCalls/${callId}`);
const data = await response.json();
console.log('Call details:', data);
```
4. Update a Specific Recent Call by ID

- Endpoint: PUT /api/recentCalls/:id
- Description: Updates the details of a specific recent call.
- Parameters:
    - `:id` - The ID of the recent call to update.
- Request Body: JSON object with the updated call details.
- Response: JSON object of the updated call.

```js
const callId = '12345';
const response = await fetch(`http://localhost:5000/api/recentCalls/${callId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: {
            displayName: 'John Doe Updated',
            date: new Date().toISOString(),
            status: 'call',
        },
        target: 'John Doe'
    }),
});

const data = await response.json();
console.log('Updated call:', data);
```
5. Delete a Specific Recent Call by ID

- Endpoint: DELETE /api/recentCalls/:id
- Description: Deletes a specific recent call by its ID.
- Parameters:
    - `:id` - The ID of the recent call to delete.
- Response: JSON object with a success message.
```js
const callId = '12345';
const response = await fetch(`http://localhost:5000/api/recentCalls/${callId}`, {
    method: 'DELETE',
});

const data = await response.json();
console.log('Delete message:', data.message);
```
### Setup Instructions
1. Backend Setup: Ensure the Express.js server is running and connected to a MongoDB database.

2. API URL Configuration: Replace http://localhost:5000 with the actual base URL of your backend if it's hosted elsewhere.

3. Error Handling: Ensure proper error handling in your frontend application to manage possible network or server errors.

### Example Usage in a React Component
```js
import React, { useState, useEffect } from 'react';

const RecentCalls = () => {
    const [calls, setCalls] = useState([]);

    useEffect(() => {
        const fetchRecentCalls = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/recentCalls');
                const data = await response.json();
                setCalls(data);
            } catch (error) {
                console.error('Error fetching recent calls:', error);
            }
        };

        fetchRecentCalls();
    }, []);

    return (
        <div>
            <h1>Recent Calls</h1>
            <ul>
                {calls.map(call => (
                    <li key={call.id}>{call.name.displayName} - {call.name.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecentCalls;
```

### Additional Notes
- Replace http://localhost:5000 with the actual base URL of your backend server if it's hosted elsewhere.
- Ensure proper error handling in your frontend application to manage possible network or server errors.