import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div style={clockStyle}>
      {formatTime(time)}
    </div>
  );
};

const clockStyle = {
  fontSize: '2em',
  fontFamily: 'monospace',
  textAlign: 'center',
  margin: '20px',
  padding: '10px',
  border: '2px solid white',
  borderRadius: '10px',
  display: 'inline-block',
};

export default DigitalClock;
