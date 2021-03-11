import { date } from "check-types";
import { addDays } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
const DatePickerr = () => {


  Date.prototype.addDayss = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }


  function getDatess(startDate, stopDate) {
    var dateeArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateeArray.push(currentDate)
      currentDate = currentDate.addDays(1);

    }
    return dateeArray;
  }

  //let testy = getDatess(new Date(), new Date().addDays(5))


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(start + 'this is the new start date')
    console.log(end + 'this is the new end date')




    //Here we handle how we set the start and stop date 

    Date.prototype.addDays = function (days) {
      var dat = new Date(this.valueOf())
      dat.setDate(dat.getDate() + days);
      return dat
    }
    function getDates(startDate, stopDate) {
      var dateArray = new Array();
      var currentDate = startDate;
      while (currentDate <= stopDate) {
        dateArray.push(currentDate)
        currentDate = currentDate.addDays(1);

      }
      return dateArray;
    }


    //var dateArray = getDates(new Date(), (new Date()).addDays(5));
    var dateArray = getDates(start, end);
    for (let i = 0; i < dateArray.length; i++) {
      //var dat = new Date()
      //dateArray[i] = dat.getTime()
      console.log(dateArray[i] + ' this is date ' + i + ' in the array');
    }


  };

  return (
    <div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          includeDates={[(new Date(), new Date().addDayss(5))]}
          selectsRange
          inline
        />
      </div>

    </div>

  );
};
export default DatePickerr;