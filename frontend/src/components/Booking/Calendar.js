import React, { useState } from 'react';

import { format } from 'date-fns';
import { DayPickerRangeController, isInclusivelyAfterDay } from "react-dates";
import { DateRange, DayPicker } from 'react-day-picker';

export default function Canlendar() {
  const [range, setRange] = useState(<DateRange | undefined>);

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
        </p>
      );
    }
  }

  return (
    <DayPickerRangeController
      numberOfMonths={2}
      minimumNights={2}
      isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
      isDayBlocked={isDayBlocked}
      onDatesChange={onDatesChange}
      onFocusChange={onFocusChange}
      focusedInput={focusedInput || "startDate"}
      startDate={start}
      endDate={end}
    />
  );
}
