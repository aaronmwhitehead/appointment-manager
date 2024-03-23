import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitAppointment } from '../features/schedulerSlice';
import '../styles/css/appointmentForm.css';

const AppointmentForm = ({ onClose, slot }) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState(slot.phoneNumber);
  const [name, setName] = useState(slot.name);
  const [isValid, setIsValid] = useState(true);

  const handleCloseForm = () => {
    onClose();
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handlePhoneNumberChange = (e) => {
    let formattedNumber = e.target.value.replace(/\D/g, '').slice(0, 10); // Remove non-digits and limit to 10 characters
    if (formattedNumber.length > 3 && formattedNumber.length <= 6) {
      formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3)}`;
    } else if (formattedNumber.length > 6) {
      formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3, 6)}-${formattedNumber.slice(6)}`;
    }
    setPhoneNumber(formattedNumber);
    setIsValid(true); // Reset valid state on change
  };

  const handleBlur = () => {
    if (phoneNumber.length !== 12 || !/^(\d{3}-){2}\d{4}$/.test(phoneNumber)) {
      setIsValid(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if(isValid) {
      // Dispatch the form data
      dispatch(submitAppointment({ 
        ...slot,
        available: false,
        name: name,
        phoneNumber: phoneNumber
      }));

      // Close the form after submission
      handleCloseForm();
    }
  }

  return (
    <div className='appointment-form-container'>
      <form onSubmit={handleFormSubmit} className='appointment-form'>
        <span className='appointment-form--title'>{slot.available ? 'Add' : 'Change'} Appointment</span>
        <span className='appointment-form--date appointment-info'>{slot.day}, {slot.month} {slot.date}</span>
        <div className='appointment-form--text-container'>
          <span className='appointment-form--time appointment-info'>{slot.startTime}</span>
          <span className='appointment-form--arrow'>&rarr;</span>
          <span className='appointment-form--time appointment-info'>{slot.endTime}</span>
        </div>
        <div className='appointment-form--input-container'>
          <input 
            type="text" 
            className='appointment-form--input' 
            name="name" 
            placeholder='Name' 
            defaultValue={slot.name} 
            onChange={handleNameChange}
            required
          />
        </div>
        <div className='appointment-form--input-container'>
          <input 
            type="text"
            id="phoneNumber"
            className={`appointment-form--input ${!isValid && 'form-input--invalid'}`}
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            onBlur={handleBlur}
            maxLength={12} // Limit input to 12 characters (including hyphens)
            placeholder="Phone Number"
            required
          />
        </div>
        <div className='appointment-form--input-container'>
          <button onClick={handleCloseForm} type="button" className='btn btn-cancel appointment-form--cancel'>Cancel</button>
          <button className='btn btn-primary appointment-form--submit' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;

