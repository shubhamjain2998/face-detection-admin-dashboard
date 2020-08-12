import React, { useState } from 'react'

const Delme = () => {

    const [final, setfinal] = useState(null)

    const today = new Date();

    const hour = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    // setfinal(hour*60*60 + minutes*60 + seconds)

    return (
        <div>{hour*60*60 + minutes*60 + seconds}</div>
    )
}

export default Delme;