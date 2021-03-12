import { AccommodationsContext } from '../contexts/AccommodationsContext'
import { date } from "check-types";
import { addDays } from "date-fns";
import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
const DatePickerr = () => {

  const { accommodationId } = useContext(AccommodationsContext)
  const testDateArray = ["1617259334000", "1617345734000", "1617432134000", "1617518534000", "1617604934000"]
  //In order INPUT CUSTOM dates into the datepicker we have to parse the string of the Date
  //Below we do this for two date strings, test 1 for minDate and test2 for maxDate
  //this will exclude all dates OUTSIDE of the selected minDate and maxDate
  const test = Date.parse('Fri Apr 02 2021 08:42:14 GMT+0200 (centraleuropeisk sommartid)')
  const test2 = Date.parse('Fri Apr 05 2021 08:42:14 GMT+0200 (centraleuropeisk sommartid)')

  console.log(test + ' ' + test2 + ' these are the parsed dates')

  console.log(accommodationId)




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

    var dateArray = getDates(start, end);
    for (let i = 0; i < dateArray.length; i++) {
      console.log(Date.parse(dateArray[i]) + ' this is date ' + i + ' in the array');
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