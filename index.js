const createEmployeeRecord = (emp) => {
  return {
    firstName: emp[0],
    familyName: emp[1],
    title: emp[2],
    payPerHour: emp[3],
    timeInEvents: new Array(),
    timeOutEvents: new Array(),
  };
};

const createEmployeeRecords = (records) => {
  const employeeRecords = records.map((rec) => createEmployeeRecord(rec));
  return employeeRecords;
};

const createTimeInEvent = (emp, timeStamp) => {
  emp.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(timeStamp.slice(11, 15)),
    date: timeStamp.slice(0, 10),
  });
  return emp;
};

const createTimeOutEvent = (emp, timeStamp) => {
  emp.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(timeStamp.slice(11, 15)),
    date: timeStamp.slice(0, 10),
  });
  return emp;
};

const hoursWorkedOnDate = (emp, date) => {
  const findDate = (e) => e.date === date;
  const timeInEvent = emp.timeInEvents.find(findDate);
  const timeOutEvent = emp.timeOutEvents.find(findDate);
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
};

const wagesEarnedOnDate = (emp, date) => {
  return emp.payPerHour * hoursWorkedOnDate(emp, date);
};

const allWagesFor = (emp) => {
  const datesWorked = emp.timeInEvents.map((e) => e.date);
  const totalWages = datesWorked.reduce((total, date) => {
	return total + wagesEarnedOnDate(emp, date);
  }, 0)
  return totalWages;
};

const findEmployeeByFirstName = (employees, firstName) => {
	const employeeRecord = employees.find((emp) => emp.firstName === firstName);
	return employeeRecord;
}

const calculatePayroll = (employees) => {
	const totalPayroll = employees.reduce((total, emp) => total + allWagesFor(emp), 0);
	return totalPayroll;

}
