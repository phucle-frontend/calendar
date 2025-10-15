const today = new Date();
const dayToday = today.getDate();
const monthToday = today.getMonth() + 1;
const yearToday = today.getFullYear();
const container = document.getElementById("container");

const daysSelectContainer = document.getElementById("days-select");

let selectedDate = dayToday;
let selectedMonth = monthToday;
let selectedYear = yearToday;

const btnForwardMonth = document.querySelector(".btn-forward-month");
const btnBackwardMonth = document.querySelector(".btn-backward-month");
const btnForwardYear = document.querySelector(".btn-forward-year");
const btnBackwardYear = document.querySelector(".btn-backward-year");

function daysInMonth(month, year) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
    default:
      return -1;
  }
}

function dayOfWeek(d, m, y) {
  // Predefined month codes for each month
  const monthCode = [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];

  // Adjust year for January and February
  if (m < 3) {
    y -= 1; // If month is January or February, treat them as part of the previous year
  }

  // Calculate the year code
  let yearCode = (y % 100) + Math.floor((y % 100) / 4);

  // Adjust year code for the century
  yearCode = (yearCode + Math.floor(y / 100) / 4 + 5 * Math.floor(y / 100)) % 7;

  // Calculate the day of the week and return the value as an integer
  return (d + monthCode[m - 1] + yearCode) % 7;
}

document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const dayToday = today.getDate();
  const monthToday = today.getMonth() + 1;
  const yearToday = today.getFullYear();

  document.getElementById("selected-month").innerHTML = monthToday;
  document.getElementById("selected-year").innerHTML = yearToday;
  document.getElementById("date-specification").innerHTML = dayToday;

  function renderCalendar() {
    container.innerHTML = "";
    daysSelectContainer.innerHTML = "";

    document.getElementById("selected-month").innerHTML = selectedMonth;
    document.getElementById("selected-year").innerHTML = selectedYear;
    document.getElementById("date-specification").innerHTML = selectedDate;

    const numberOfDays = daysInMonth(selectedMonth, selectedYear);
    const value_dayOfWeek = dayOfWeek(1, selectedMonth, selectedYear);

    for (let i = 0; i < numberOfDays; i++) {
      const newDateOption = document.createElement("option");
      newDateOption.textContent = `${i + 1}`;
      newDateOption.value = `${i + 1}`;
      daysSelectContainer.appendChild(newDateOption);
    }

    // Add leading empty cells
    for (let i = 0; i < value_dayOfWeek; i++) {
      const emptyDiv = document.createElement("div");
      emptyDiv.classList.add("calendar-body-date-item");
      container.appendChild(emptyDiv);
    }

    // Add actual day cells
    for (let i = 1; i <= numberOfDays; i++) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("calendar-body-date-item");
      newDiv.textContent = `${i}`;
      if (i === selectedDate) {
        newDiv.classList.add("calendar-body-date-item-active");
      }

      newDiv.addEventListener("click", function () {
        selectedDate = i;
        document.getElementById("date-specification").innerHTML = i;

        const prevActiveDate = document.querySelectorAll(
          ".calendar-body-date-item-active"
        );
        prevActiveDate.forEach((div) =>
          div.classList.remove("calendar-body-date-item-active")
        );
        newDiv.classList.add("calendar-body-date-item-active");

        const date = new Date(
          `${selectedYear}-${selectedMonth}-${selectedDate}`
        );
        const day = date.getDay();
        const daysOfWeek = [
          "Chủ Nhật",
          "Thứ 2",
          "Thứ 3",
          "Thứ 4",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
        ];
        document.querySelector(".date-of-week").innerHTML = daysOfWeek[day];
      });

      container.appendChild(newDiv);
    }

    // Add trailing empty cells
    const totalCells = value_dayOfWeek + numberOfDays;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 0; i < remainingCells; i++) {
      const emptyDiv = document.createElement("div");
      emptyDiv.classList.add("calendar-body-date-item");
      emptyDiv.style.visibility = "hidden";
      container.appendChild(emptyDiv);
    }
  }

  const container = document.getElementById("calendar-body");

  btnForwardMonth.addEventListener("click", function () {
    if (selectedMonth === 12) {
      selectedMonth = 1;
      selectedYear++;
    } else {
      selectedMonth++;
    }
    renderCalendar();
  });

  btnBackwardMonth.addEventListener("click", function () {
    if (selectedMonth === 1) {
      selectedMonth = 12;
      selectedYear--;
    } else {
      selectedMonth--;
    }
    renderCalendar();
  });

  btnForwardYear.addEventListener("click", function () {
    selectedYear++;
    renderCalendar();
  });

  btnBackwardYear.addEventListener("click", function () {
    selectedYear--;
    renderCalendar();
  });

  const btnResetDefaultDate = document.querySelector(".btn-reset-default-date");
  btnResetDefaultDate.addEventListener("click", function () {
    selectedYear = yearToday;
    selectedMonth = monthToday;
    selectedDate = dayToday;
    renderCalendar();
  });

  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.addEventListener("click", function () {
    const inputYear = parseInt(document.getElementById("input-year").value);
    const selectedOptionDate = parseInt(
      document.getElementById("days-select").value
    );
    const selectedOptionMonth = parseInt(
      document.getElementById("months-select").value
    );
    if (
      isNaN(inputYear) ||
      inputYear < 1000 ||
      isNaN(selectedOptionMonth) ||
      selectedOptionMonth < 1 ||
      selectedOptionMonth > 12 ||
      isNaN(selectedOptionDate) ||
      selectedOptionDate < 1 ||
      selectedOptionDate > daysInMonth(selectedOptionMonth, inputYear)
    ) {
      alert("Please enter a valid year, month, and date.");
      return;
    } else if (inputYear > 4000 || inputYear <= 1000) {
      alert("Year must be less than or equal to 4000 and over 1000.");
      return;
    }
    selectedYear = parseInt(inputYear);
    selectedMonth = parseInt(selectedOptionMonth);
    selectedDate = parseInt(selectedOptionDate);
    renderCalendar();
  });
  renderCalendar(); // first render
});
