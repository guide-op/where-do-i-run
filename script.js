const eventsA = [
    { time: '06:00', event: 'Підйом' },
    { time: '08:30', event: 'Пара 1, Заняття 1' },
    { time: '09:00', event: 'Хвилина мовчання' },
    { time: '09:15', event: 'Перерва' },
    { time: '09:20', event: 'Пара 1, Заняття 2' },
    { time: '10:05', event: 'Перерва' },
    { time: '10:20', event: 'Пара 2, Заняття 1' },
    { time: '11:05', event: 'Перерва' },
    { time: '11:10', event: 'Пара 2, Заняття 2' },
    { time: '11:55', event: 'Перерва' },
    { time: '12:10', event: 'Пара 3, Заняття 1' },
    { time: '12:55', event: 'Перерва' },
    { time: '13:00', event: 'Пара 3, Заняття 2' },
    { time: '13:45', event: 'Перерва на обід' },
    { time: '15:30', event: 'Пара 4, Заняття 1' },
    { time: '16:15', event: 'Перерва' },
    { time: '16:20', event: 'Пара 4, Заняття 2' },
    { time: '17:05', event: 'Перерва' },
    { time: '17:15', event: 'Пара 5, Заняття 1' },
    { time: '18:00', event: 'Перерва' },
    { time: '18:05', event: 'Пара 5, Заняття 2' },
    { time: '18:50', event: 'Кінець пар' },
    { time: '20:20', event: 'Вечірнє шинкування' },
    { time: '22:00', event: 'Відбій' }
];

let events = eventsA;

// Swiper
const swiper = new Swiper('.slider', {
    direction: 'horizontal',
    loop: false,  // Disable loop to prevent endless scrolling
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    //navigation: {
    //    nextEl: '.swiper-button-next',
    //    prevEl: '.swiper-button-prev',
    //},
});


// Get the current day of the week
const daysOfWeek = ["неділя", "понеділок", "вівторок", "середа",
                   "четвер", "п'ятниця", "субота"];
const today = new Date();
const day = daysOfWeek[today.getDay()];

// Calculate the number (1 or 2) based on the date
const startDate = new Date('2024-08-07');
const timeDiff = today.getTime() - startDate.getTime();
const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
const number = ((daysPassed) % 2) + 1;
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

// Timetable driver


const timetableElement = document.getElementById('timetable');
const countdownElement = document.getElementById('countdown');

function displayTimetable() {
    timetableElement.innerHTML = '';
    events.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${entry.time} - ${entry.event}`;
        li.dataset.index = index;
        timetableElement.appendChild(li);
    });
}

function checkTime() {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    let activeIndex = events.findIndex(event => event.time > currentTime) - 1;
    if (activeIndex < 0) activeIndex = events.length - 1;
    
    // Mark events as done or active
    Array.from(timetableElement.children).forEach((li, index) => {
        if (index < activeIndex) {
            li.classList.add('done');
            li.classList.remove('active');
        } else if (index === activeIndex) {
            li.classList.add('active');
            li.classList.remove('done');
        } else {
            li.classList.remove('active', 'done');
        }
    });

    // Calculate time left for the next event
    const nextEventData = events[(activeIndex + 1) % events.length];
    const nextEventTime = nextEventData.time;
    const nextEventName = nextEventData.event;
    const [nextHours, nextMinutes] = nextEventTime.split(':').map(Number);
    const nextEventDate = new Date(now);
    nextEventDate.setHours(nextHours, nextMinutes, 0, 0);

    let timeDiff = (nextEventDate.getTime() - now.getTime()) / 1000;
    if (timeDiff < 0) timeDiff += 24 * 60 * 60; // If past midnight, move to next day

    const hoursLeft = Math.floor(timeDiff / 3600);
    const minutesLeft = Math.floor((timeDiff % 3600) / 60);
    const secondsLeft = Math.floor(timeDiff % 60);

    countdownElement.textContent = `${nextEventName} через: ${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
}

// Initial display of timetable
displayTimetable();
checkTime();
setInterval(checkTime, 1000);
