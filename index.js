// Your code here
function createEmployeeRecord(arr) {
    let record
    return record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arys) {
    return arys.map(createEmployeeRecord)
}

function createDSObj(getType, dateStamp) {
    return { type: getType, date: dateStamp.slice(0, 10), hour: parseInt(dateStamp.slice(-4)) }
}

function createTimeInEvent(obj, dateStamp) {
    obj.timeInEvents.push(createDSObj("TimeIn", dateStamp))
    return obj
}


function createTimeOutEvent(obj, dateStamp) {
    obj.timeOutEvents.push(createDSObj("TimeOut", dateStamp))
    return obj
}

function hoursWorkedOnDate(obj, dateYMD) {
    const timeIn = obj.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = obj.timeOutEvents.find((e) => e.date === dateYMD).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(obj, dateYMD) {

    const wage = obj.payPerHour
    const hoursWorked = hoursWorkedOnDate(obj, dateYMD)
    return wage * hoursWorked
}

function allWagesFor(obj) {
    const allWages = obj.timeInEvents.map((day) => { return wagesEarnedOnDate(obj, day.date) })
    return allWages.reduce((acc, cv) => acc + cv)
}

function calculatePayroll(records) {
    const allPay = (records.map((empl) => { return allWagesFor(empl) }))
    return allPay.reduce((acc, cv) => acc + cv)
}

function findEmployeeByFirstName(srcArray, first_Name) {
    return srcArray.find((record) => record.firstName === first_Name)
}



// ////////////////

let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

let sTimeData = [
    ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
    ["2019-01-02 1000", "2019-01-02 1300"] // 3 * 100 = 300 ===> 700 total
]

let rTimeData = [
    ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
    ["2019-01-12 1000", "2019-01-12 1300"] // 3 * 10 = 40 ===> 70 total ||=> 770
]

sTimeData.forEach(function(d) {
    let [dIn, dOut] = d
    sRecord = createTimeInEvent(sRecord, dIn)
    sRecord = createTimeOutEvent(sRecord, dOut)
})

rTimeData.forEach(function(d, i) {
    let [dIn, dOut] = d
    rRecord = createTimeInEvent(rRecord, dIn)
    rRecord = createTimeOutEvent(rRecord, dOut)
})

let employees = [sRecord, rRecord]

calculatePayroll(employees)