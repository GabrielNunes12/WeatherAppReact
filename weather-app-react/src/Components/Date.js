import React from 'react';

const dateBuilder = () => {
  const date = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const fullYear = date.getFullYear();
  return `${month} ${day} ${fullYear}`;
}

const DateComponent = () => {
  return (
    <div className="date">
      {dateBuilder()}
    </div>
  )
}

export default DateComponent;