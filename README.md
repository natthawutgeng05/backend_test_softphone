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

## For Axios
CRUD operations using axios with your API.

### Recent Calls API Integration Guide (Using Axios)
This section provides instructions on how to use the API endpoints for managing recent calls with axios. The API supports Create, Read, Update, and Delete (CRUD) operations.

1. Create a New Recent Call
- Endpoint: POST /api/recentCalls
- Description: Creates a new recent call entry in the database.
- Request Body: A JSON object containing the call details.
- Response: Returns the JSON object of the created call.

```js
import axios from 'axios';

const createRecentCall = async () => {
    const newCall = {
        id: '12345',
        name: {
            displayName: 'John Doe',
            date: new Date().toISOString(),
            status: 'call',
        },
        target: 'John Doe'
    };

    try {
        const response = await axios.post('http://localhost:5000/api/recentCalls', newCall);
        console.log('New call created:', response.data);
    } catch (error) {
        console.error('Error creating recent call:', error);
    }
};

createRecentCall();
```
2. Retrieve All Recent Calls
- Endpoint: GET /api/recentCalls
- Description: Fetches a list of all recent calls stored in the database.
- Response: Returns an array of JSON objects, each representing a recent call.

Example Usage:
```js
import axios from 'axios';

const fetchAllRecentCalls = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/recentCalls');
        console.log('All recent calls:', response.data);
    } catch (error) {
        console.error('Error fetching recent calls:', error);
    }
};

fetchAllRecentCalls();
```
3. Retrieve a Specific Recent Call by ID
- Endpoint: GET /api/recentCalls/:id
- Description: Fetches the details of a specific recent call by its ID.
- Parameters:
  - `:id` - The unique identifier of the recent call you want to retrieve.
- Response: Returns a JSON object representing the specific recent call.

Example Usage:
```js
import axios from 'axios';

const fetchRecentCallById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/recentCalls/${id}`);
        console.log(`Recent call with ID ${id}:`, response.data);
    } catch (error) {
        console.error(`Error fetching recent call with ID ${id}:`, error);
    }
};

fetchRecentCallById('your-call-id-here');
```
4. Update a Specific Recent Call by ID
- Endpoint: PUT /api/recentCalls/:id
- Description: Updates the details of a specific recent call in the database.
- Parameters:
    - :id - The unique identifier of the recent call you want to update.
- Request Body: A JSON object containing the updated call details.
- Response: Returns the JSON object of the updated call.

Example Usage:
```js
import axios from 'axios';

const updateRecentCallById = async (id) => {
    const updatedCall = {
        name: {
            displayName: 'John Doe Updated',
            date: new Date().toISOString(),
            status: 'call',
        },
        target: 'John Doe Updated'
    };

    try {
        const response = await axios.put(`http://localhost:5000/api/recentCalls/${id}`, updatedCall);
        console.log(`Updated call with ID ${id}:`, response.data);
    } catch (error) {
        console.error(`Error updating recent call with ID ${id}:`, error);
    }
};

updateRecentCallById('your-call-id-here');
```
5. Delete a Specific Recent Call by ID
- Endpoint: DELETE /api/recentCalls/:id
- Description: Deletes a specific recent call from the database.
- Parameters:
    - `:id` - The unique identifier of the recent call you want to delete.
- Response: Returns a JSON object with a success message.

Example Usage:
```js
import axios from 'axios';

const deleteRecentCallById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/recentCalls/${id}`);
        console.log(`Delete message:`, response.data.message);
    } catch (error) {
        console.error(`Error deleting recent call with ID ${id}:`, error);
    }
};

deleteRecentCallById('your-call-id-here');
```
### Additional Notes
- Replace http://localhost:5000 with the actual base URL of your backend server if it's hosted elsewhere.
- Ensure proper error handling in your frontend application to manage possible network or server errors.