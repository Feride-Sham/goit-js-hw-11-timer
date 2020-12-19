import css from "./styles.css";
import refs from "./refs";

const { daysValue, hoursValue, minsValue, secsValue, calendar } = refs;
let day = null;

// делает даты до сегодняшней неаквтивными
let minDate = `${
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1) +
  "-" +
  new Date().getDate()
}`;
calendar.setAttribute("min", `${minDate}`);

calendar.addEventListener("change", toStartTimer);

function myTimer(date) {
  let timeBetween = new Date(date) - Date.now();
  if (timeBetween < 0) {
    addTimeValueInTimer({ days: "00", hours: "00", mins: "00", secs: "00" });
    return;
  } else {
    let time = setTimeValue(timeBetween);
    addTimeValueInTimer(time);
  }
}

// функция запуска таймера
function toStartTimer() {
  day = new Date(calendar.value);
  setInterval(() => {
    myTimer(day);
  }, 1000);
}

// функция расчета значений временного интервала
function setTimeValue(timeValue) {
  let days = Math.floor(timeValue / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (timeValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  let mins = Math.floor((timeValue % (1000 * 60 * 60)) / (1000 * 60));
  let secs = Math.floor((timeValue % (1000 * 60)) / 1000);
  return { days, hours, mins, secs };
}

// функция, которая записывает значения в таймер
function addTimeValueInTimer(objTime) {
  daysValue.textContent = objTime.days;
  hoursValue.textContent = objTime.hours;
  minsValue.textContent = objTime.mins;
  secsValue.textContent = objTime.secs;
}
