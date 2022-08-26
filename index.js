/* Your Code Here */
const createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(arr) {
    return arr.map(data => {
        return createEmployeeRecord(data)
    })
}

const createTimeInEvent = function(time) {
    const [date, hour] = time.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

const createTimeOutEvent = function(time) {
    const [date, hour] = time.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

const hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(time => time.date === date)
    let timeOut = this.timeOutEvents.find(time => time.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = function(dateSought) {
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(data => data.firstName === firstName)
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const calculatePayroll = function(arr) {
    return arr.reduce((total, employee) => {
        return total + allWagesFor.call(employee)
    }, 0)
}