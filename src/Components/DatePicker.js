import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({ value, onChange }) {
    return (
        <div>
            <label htmlFor="date">Select a date:</label>
            <DatePicker
                selected={value}
                onChange={onChange}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()}
                filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
            />
        </div>
    );
}

export default CustomDatePicker;