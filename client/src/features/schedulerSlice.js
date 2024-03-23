import { createSlice } from '@reduxjs/toolkit';
import { generateInitialStateForWeek } from '../utils/utils';

const initialState = {
  timeSlotsForWeek: generateInitialStateForWeek()
};

const schedulerSlice = createSlice({
  name: 'scheduler',
  initialState,
  reducers: {
    submitAppointment: (state, action) => {
      const { id, name, phoneNumber } = action.payload;

      // Find the slot with the specified ID in the timeSlotsForWeek array
      let timeSlotToUpdate = null;
      for (const day of state.timeSlotsForWeek) {
        const slot = day.slots.find((slot) => slot.id === id);
        if (slot) {
          timeSlotToUpdate = slot;
          break; // Exit the loop when the slot is found
        }
      }

      // If the time slot is found, mark it as booked and update the name and phone number
      if (timeSlotToUpdate) {
        timeSlotToUpdate.available = false;
        timeSlotToUpdate.name = name;
        timeSlotToUpdate.phoneNumber = phoneNumber;
      }
    },
  },
});

export const { submitAppointment } = schedulerSlice.actions;
export default schedulerSlice.reducer;