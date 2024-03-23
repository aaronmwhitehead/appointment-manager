import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentWeekDates } from '../utils/utils';
import TimeSlot from './TimeSlot';
import '../styles/css/timeSlotList.css';

const TimeSlotList = () => {
  const [currentWeekDates, setCurrentWeekDates] = useState([]);

  const timeSlotsForWeek = useSelector(state => state.scheduler.timeSlotsForWeek);
  const monthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  useEffect(() => {
    setCurrentWeekDates(getCurrentWeekDates(new Date()));
  }, []);
  
  return (
    <div className='timeslot-list'>
      <div className='timeslot-list--header'>
        <span className='timeslot-list--title'>{monthName}</span>
      </div>
      <div className='week-view'>
        <div className='hour-column'>
          <span className='timezone-label'>
            EST
          </span>
          {/* Render available time slots for the corresponding day */}
          <div className='hour-list'>
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className='time-label--container'>
                <span className='time-label'>{((i + 9) % 12 || 12).toString()} {(i + 9) < 12 ? 'AM' : 'PM'}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Render day titles */}
        {currentWeekDates.map((day, i) => (
          <div key={i} className='day-container'>
            <span className='day-title'>
              {day.day?.substring(0, 3).toUpperCase()} {day.date}
            </span>
            {/* Render available time slots for the corresponding day */}
            <div className='timeslot-list--availability'>
              {timeSlotsForWeek[i].slots.map((slot, slotId) => (
                <TimeSlot key={slotId} slot={slot}/>
              ))}
              <div className='slot--container'>
                <div className='slot slot-disabled'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeSlotList;
