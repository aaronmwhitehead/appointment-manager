// Create a condition to mark some slots as booked (for testing)
const isSlotBooked = (currentTime) => {
  // Check if the current time falls within certain booked slots
  // For demonstration purposes, let's say slots from 10am to 12pm on Monday and 2pm to 4pm on Wednesday are already booked as well as any slot before the current time
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentDay = currentTime.getDay();
  const currentDate = currentTime.getDate();
  const now = new Date();

  if (
    (currentHour === 10 && currentMinute >= 0 && currentMinute < 30 && currentDay === 1 ) ||
    (currentHour === 11 && currentMinute >= 0 && currentDay === 1) ||
    (currentHour === 14 && currentMinute >= 0 && currentMinute < 30 && currentDay === 3) ||
    (currentHour === 15 && currentMinute >= 0 && currentDay === 3)
  ) {
    return true; // Slot is booked
  }

  if(currentHour <= now.getHours() && currentDate <= now.getDate()) {
    return true; // Slot is booked
  }

  return false; // Slot is available
};

const generateAvailableSlotsForDay = (dateObj) => {
  const startTime = new Date(dateObj.month + ' ' + dateObj.date + ', ' + dateObj.year)
  startTime.setHours(9, 0, 0); // Set start time to 9am

  const endTime = new Date(dateObj.month + ' ' + dateObj.date + ', ' + dateObj.year)
  endTime.setHours(17, 0, 0); // Set end time to 5pm

  const slots = [];
  let currentTime = new Date(startTime);

  while (currentTime < endTime) {
    // Check if the current slot should be marked as booked
    let available = !isSlotBooked(currentTime);

    slots.push({
      id: currentTime.getTime(),
      startTime: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: new Date(currentTime.getTime() + 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      day: dateObj.day,
      month: dateObj.month,
      date: dateObj.date,
      year: dateObj.year,
      available: available,
      phoneNumber: available ? '' : '000-000-0000',
      name: available ? '' : 'Admin Test'
    });

    currentTime.setHours(currentTime.getHours() + 1); // Move to the next hour
  }

  return slots;
};


export const generateInitialStateForWeek = () => {
  const date = new Date();

  // Get the days for the current week
  const currentWeekDates = getCurrentWeekDates(date);

  // Array to store the initial available time slots for the week
  const availableTimeSlotsForWeek = [];

  // Iterate through each of the days in the current week to get the available time slots for each day
  currentWeekDates.forEach((dateObj) => {
    const slotsForDay = generateAvailableSlotsForDay(dateObj);
    availableTimeSlotsForWeek.push({
      slots: slotsForDay,
    });
  });

  // Return the currently available time slots for the week
  return availableTimeSlotsForWeek;
};

export const getCurrentWeekDates = (currentDate) => {
  const currentDayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  // Calculate the starting date of the current week 
  // if you want the calendar to start on Sunday, use 'daysFromSunday'. Otherwise, you can specify the number of days before today that you want the calendar to show.
  const daysFromSunday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek; // Number of days from Sunday to the current day
  const weekStartDate = new Date(currentDate);
  weekStartDate.setDate(currentDate.getDate() - 0); // Start the calendar on today's date

  // Create an array to store the dates of the current week
  const currentWeekDates = [];
  
  // Iterate through the days of the week, adding each date to the array
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStartDate);
    date.setDate(weekStartDate.getDate() + i);
    const dateString = date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).replace(/,/g, '');

    currentWeekDates.push({
      day: dateString.split(' ')[0], // Extract day name from the formatted string
      month: dateString.split(' ')[1].trim(), // Extract month from the formatted string
      date: dateString.split(' ')[2].trim(), // Extract date from the formatted string
      year: dateString.split(' ')[3].trim() // Extract the year from the formatted string 
    });
  }

  return currentWeekDates;
}