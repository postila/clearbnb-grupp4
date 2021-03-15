import { AccommodationsContext } from '../contexts/AccommodationsContext'
import { date } from "check-types";
import { addDays } from "date-fns";
import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";

const DatePickerr = (props) => {

  const { accommodationId } = useContext(AccommodationsContext)

  const [startDate, setStartDate] = useState(props.arrDate);
  const [endDate, setEndDate] = useState(props.depDate);


  const onChange = dates => {
    let [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(start + 'this is the new start date')
    console.log(end + 'this is the new end date')
    // console.log(dates)

    console.log(startDate, 'start')
    console.log(endDate, 'end')
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

    var dateArray = getDates(start, end);
    for (let i = 0; i < dateArray.length; i++) {
      // console.log(Date.parse(dateArray[i]) + ' this is date ' + i + ' in the array');  
    }
  };

  // useEffect(() => {
  //   // setStartDate(props.arrDate)
  //   // setEndDate(props.depDate)
  // }, [start, end])

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
          minDate={startDate}
          maxDate={endDate}
          //filterDate={filteredDays}
          selectsRange
          inline
        />
      </div>

    </div>

  );
};
export default DatePickerr;