import { useState } from 'react';

function Recomendations() {
    async function getRecomendation(events) {
        const eventType = 'matcha'
        const groupSize = 6
        const response = await fetch('http://localhost:3000/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventType, groupSize })
        });

        const data = await response.json();
        console.log(data)
        setData(data.recommendation)
    }

    const [data, setData] = useState()

    return(

        <>
            <button onClick={getRecomendation}>Get Recomendations</button>
            <p>Response: {data}</p>
        </>
    )
}

export default Recomendations