// Get the current day of the week
const daysOfWeek = ["неділя", "понеділок", "вівторок", "середа",
                   "четвер", "п'ятниця", "субота"];
const today = new Date();
const day = daysOfWeek[today.getDay()];

// Calculate the number (1 or 2) based on the date
const startDate = new Date('2024-08-08');
const timeDiff = today.getTime() - startDate.getTime();
const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
const number = (daysPassed % 2) + 1;
const numDescr = {
        1: "Озеро",
        2: "Старий КПП",
}

// Format the date as dd.mm.yyyy
const dayOfMonth = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = today.getFullYear();
const formattedDate = `${dayOfMonth}.${month}.${year}`;

// Display the day and the number
document.getElementById('day').textContent = `Сьогодні ${day},`;
document.getElementById('day2').textContent = `${formattedDate}`;

document.getElementById('number-display').textContent = number;
document.getElementById('number-description').textContent = numDescr[number];
