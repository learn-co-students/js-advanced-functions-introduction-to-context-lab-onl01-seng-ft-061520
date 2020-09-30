function createEmployeeRecord(array){
  let empObj = {};
  empObj.firstName = array[0];
  empObj.familyName = array[1];
  empObj.title = array[2];
  empObj.payPerHour = array[3];
  empObj.timeInEvents = [];
  empObj.timeOutEvents = [];
  return empObj;
}

function createEmployeeRecords(array){
  const records = [];
  array.forEach(row => records.push(createEmployeeRecord(row)));
  return records;
}

function createTimeInEvent(empObj, date){
  let timeInEvent = {};
  const time = date.split(' ')
  timeInEvent.type = "TimeIn";
  timeInEvent.hour = parseInt(time[1]);
  timeInEvent.date = time[0];
  empObj.timeInEvents.push(timeInEvent);
  return empObj;
}

function createTimeOutEvent(empObj, date){
  let timeOutEvent = {};
  const time = date.split(' ')
  timeOutEvent.type = "TimeOut";
  timeOutEvent.hour = parseInt(time[1]);
  timeOutEvent.date = time[0];
  empObj.timeOutEvents.push(timeOutEvent);
  return empObj;
}

function hoursWorkedOnDate(empObj, date){
  const timeIn = empObj.timeInEvents.find(e => e.date === date);
  const timeOut = empObj.timeOutEvents.find(e => e.date === date);
  const hoursWorked = timeOut.hour - timeIn.hour
  return hoursWorked/100;
}

function wagesEarnedOnDate(empObj, date){
  return hoursWorkedOnDate(empObj, date) * empObj.payPerHour;
}

function allWagesFor(empObj){
  const dates = [];
  empObj.timeInEvents.forEach(e => dates.push(e.date));
  let wages = dates.map(d => wagesEarnedOnDate(empObj, d));
  return wages.reduce(function(total, element){ return element + total},0);
}

function findEmployeeByFirstName(array, firstName){
  return array.find(obj => obj.firstName === firstName);
}

function calculatePayroll(array){
  const payOuts = array.map(empObj => allWagesFor(empObj));
  return payOuts.reduce(function(total, element){ return element + total},0);
}
