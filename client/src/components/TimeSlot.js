import { useState } from 'react';
import '../styles/css/timeSlot.css';
import AppointmentForm from './AppointmentForm';

const TimeSlot = ({ slot }) => {
  const [appointmentFormOpen, setAppointmentFormOpen] = useState(false); // State to manage modal visibility

  const handleTimeSlotClick = () => {
    setAppointmentFormOpen(true); // Open the modal
  };

  const closeModal = () => {
    setAppointmentFormOpen(false); // Close the modal
  };

  return (
    <div className='slot--container'>
      <div onClick={handleTimeSlotClick} className={`slot ${slot.available ? 'available' : 'booked'}`}>
        {
          !slot.available ?
          <>
            <span className='slot--name'>{slot.name}</span>
            <span className='slot--schedule'>{slot.startTime}-{slot.endTime}</span>
          </>
          :
          <span>Available</span>
        }
      </div>

      {appointmentFormOpen && <AppointmentForm onClose={closeModal} slot={slot}/>}
    </div>
  );
}

export default TimeSlot;
