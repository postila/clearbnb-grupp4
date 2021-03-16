import { AccommodationsContext } from '../contexts/AccommodationsContext'
import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";

const DatePickerr = () => {

  const { accommodationId } = useContext(AccommodationsContext)

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);




  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(start, 'start datum');
    console.log(end, 'slut datum');

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