// Your code here
//array[firstName, famName, title, payRate]
let createEmployeeRecord = function (array) {
  // let info = [];
  // info.push(array);
  // info.push("timeInEvents");
  // info.push("timeOutEvents");
  // // array.map(info => {
  // //   firstName: info.firstName, familyName: info.familyName, title: info.title, payPerHour: info.payPerHour, timeInEvents: undefined, timeOutEvents: undefined}
  // // })
  // return Object.keys(info);
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = function (array) {
  return array.map(function (r) {
    return createEmployeeRecord(r);
  });
};

let createTimeInEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

let createTimeOutEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

let hoursWorkedOnDate = function (employee, soughtDate) {
  let inEvent = employee.timeInEvents.find(function (e) {
    return e.date === soughtDate;
  });

  let outEvent = employee.timeOutEvents.find(function (e) {
    return e.date === soughtDate;
  });

  return (outEvent.hour - inEvent.hour) / 100;
};

let wagesEarnedOnDate = function (employee, dateSought) {
  let rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour;
  return parseFloat(rawWage.toString());
};

let allWagesFor = function (employee) {
  let eligibleDates = employee.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);

  return payable;
};

let findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find(function (rec) {
    return rec.firstName === firstName;
  });
};

let calculatePayroll = function (arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function (memo, rec) {
    return memo + allWagesFor(rec);
  }, 0);
};
