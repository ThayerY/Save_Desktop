// // Helper function to convert time to 12-hour format
// const convertTo12 = (time) => {
//   // Check if time is already in 12-hour format
//   if (time.includes('AM') || time.includes('PM')) {
//     return time;
//   }

//   // Split 24-hour time
//   const [hours, minutes] = time.split(':').map(Number);

//   // Determine AM/PM
//   const amPm = hours >= 12 ? 'PM' : 'AM';

//   // Convert to 12-hour format
//   const convertedHours = hours % 12 || 12;

//   // Format the time
//   return `${convertedHours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
// }

// export default convertTo12;


//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

// Helper function to convert time to 12-hour format
const convertTo12 = (time) => {
  // If already in 12-hour format
  if (time.includes('AM') || time.includes('PM')) {
    return time;
  }

  const [hours, minutes] = time.split(':').map(Number);
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const convertedHours = hours % 12 || 12;

  return `${convertedHours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
};

export default convertTo12;
