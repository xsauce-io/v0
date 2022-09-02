import React from "react";

export const Countdown = () => {


  const counter = () => {

  const countDate = new Date("September 5, 2022 12:00:00").getTime()
  console.log(countDate);
  const now = new Date().getTime();
  const gap = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  console.log(gap)


  document.querySelector('#container-day').innerText = textDay;
  document.querySelector('#container-hour').innerText = textHour;
  document.querySelector('#container-minute').innerText = textMinute;
  document.querySelector('#container-second').innerText = textSecond;
  }

  setInterval(counter, 1000)

return (

<div className="mobile:flex flex-row space-x-2 justify-center text-[10px] bg-[#630606] text-white p-4 items-center">
  <h1 className="laptop:font-bold text-[18px] mobile:font-bold text-[8px]">Release Countdown:</h1>

<div id="container-day">
  <h3 >Time</h3>
</div>
<h3>Day(s)</h3>
<h3>:</h3>
<div id="container-hour">
  <h3 >Time</h3>
</div>
<h3>Hour(s)</h3>
<h3>:</h3>
<div id="container-minute">
  <h3>Time</h3>
</div>
<h3>Minutes(s)</h3>
<h3>:</h3>
<div id="container-second">
  <h3 >Time</h3>
</div>
<h3>Second(s)</h3>
</div>

)
};