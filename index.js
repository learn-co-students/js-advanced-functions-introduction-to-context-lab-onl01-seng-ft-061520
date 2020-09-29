// Your code here
const createEmployeeRecord = function(element) {
  return {
    firstName: element[0],
    familyName: element[1],
    title: element[2],
    payPerHour: element[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = function(elementData) {
  return elementData.map(function(element) {
    return createEmployeeRecord(element)
  })
}

const createTimeInEvent = function(employeeRecord, dateTime) {
  let [date, hour] = dateTime.split(' ')
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employeeRecord
}

const createTimeOutEvent = function(employeeRecord, dateTime) {
  let [date, hour] = dateTime.split(' ')
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employeeRecord
}

const hoursWorkedOnDate = function(employeeRecord, dateWorked) {
  let clockedIn = employeeRecord.timeInEvents.find(function(t){
    return t.date === dateWorked
  })
  let clockedOut = employeeRecord.timeOutEvents.find(function(t){
    return t.date === dateWorked
  })
  return (clockedOut.hour - clockedIn.hour) / 100
}

const wagesEarnedOnDate = function(employeeRecord, dateWorked) {
  let wage = hoursWorkedOnDate(employeeRecord, dateWorked) * employeeRecord.payPerHour
  return parseFloat(wage.toString())
}

const allWagesFor = function(employeeRecord) {
  let multipleDates = employeeRecord.timeInEvents.map(function(t){
    return t.date
  })
  let aggregate = multipleDates.reduce(function(memo, d){
    return memo + wagesEarnedOnDate(employeeRecord, d)
  }, 0)
  return aggregate
}

const calculatePayroll = function(allEmployeeRecords){
  return allEmployeeRecords.reduce(function(memo, rec){
    return memo + allWagesFor(rec)
  }, 0)
}

const findEmployeeByFirstName = function(employees, firstName) {
  return employees.find(function(e){
    return e.firstName === firstName
  })
}
