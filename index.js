// Your code here
function calculateHoursWorked(checkIn, checkOut) {
    const checkInTime = parseInt(checkIn.slice(-4), 10);
    const checkOutTime = parseInt(checkOut.slice(-4), 10);
    return (checkOutTime - checkInTime) / 100;
}


function processTimeCards(timeCards) {
    return timeCards.map((timeCard) => {
        const { employeeId, checkIn, checkOut } = timeCard;


        const hoursWorked = calculateHoursWorked(checkIn, checkOut);


        const hourlyRate = 10;


        const wages = hoursWorked * hourlyRate;


        return {
            employeeId,
            checkIn,
            checkOut,
            hoursWorked,
            wages,
        };
    });
}


function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}


function createEmployeeRecords(arrOfArr) {
    return arrOfArr.map(createEmployeeRecord);
}


function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return employee;
}


function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(
        (event) => event.date === date
    );
    const timeOutEvent = employee.timeOutEvents.find(
        (event) => event.date === date
    );

    if (timeInEvent && timeOutEvent) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }

    return 0;
}


function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}


function allWagesFor(employee) {
    const dates = employee.timeInEvents.map((event) => event.date);
    return dates.reduce(
        (totalWages, date) => totalWages + wagesEarnedOnDate(employee, date),
        0
    );
}


function calculatePayroll(employees) {
    return employees.reduce(
        (totalPayroll, employee) => totalPayroll + allWagesFor(employee),
        0
    );
}


const timeCards = [
    { employeeId: 1, checkIn: "2024-01-11 0800", checkOut: "2024-01-11 1000" },
    { employeeId: 2, checkIn: "2024-01-11 0900", checkOut: "2024-01-11 1100" },

];


const employees = createEmployeeRecords([
    ["Loki", "Laufeyson", "Trickster", 16],
    ["Natalia", "Romanov", "Spy", 20],

]);

timeCards.forEach((timeCard, index) => {
    const employee = employees[index];
    createTimeInEvent(employee, timeCard.checkIn);
    createTimeOutEvent(employee, timeCard.checkOut);
});

console.log(hoursWorkedOnDate(employees[0], "2024-01-11"));
console.log(wagesEarnedOnDate(employees[0], "2024-01-11"));

console.log(calculatePayroll(employees)); 