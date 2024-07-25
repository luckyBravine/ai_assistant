import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = "4553a4e50d202d0d7dbc5bf7a0121541503c64cd025149189073de00c7b6eace"; // Directly assign the token
  
      console.log('API URL:', apiUrl);
      console.log('Token:', token);
  
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`, // Include the token in the Authorization header
          },
        });
  
        console.log('Response Status:', response.status);
  
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
  
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);
  
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          console.log('Result:', result);
          setData(result);
        } else {
          throw new Error('Response was not JSON');
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  
  
  

  return (
    <>
     <p>Hello world</p>
    
    </>
  )
}

export default App
