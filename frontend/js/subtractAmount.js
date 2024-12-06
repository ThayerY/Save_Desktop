
// export const subtractAmount = async (apiUrl, fetchSavings, amountInputEl, tableBodyEl, totalAmountEl, attachDeleteListeners) => {
//   const amount = parseFloat(amountInputEl.value);

//   if (isNaN(amount) || amount <= 0) {
//     alert("Please enter a valid amount!");
//     return;
//   }

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     const currentTotal = data.reduce((sum, saving) => sum + saving.amount, 0);

//     if (currentTotal === 0) {
//       alert("No amount available to subtract from.");
//       return;
//     }

//     const postResponse = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         amount: -amount,
//         currentAmount: currentTotal,
//         totalAmount: currentTotal - amount,
//         date: new Date().toISOString().split("T")[0],
//         today: new Date().toDateString(),
//         time: new Date().toLocaleTimeString(),
//       }),
//     });

//     if (postResponse.status === 201) {
//       fetchSavings(apiUrl, tableBodyEl, totalAmountEl, attachDeleteListeners);
//       amountInputEl.value = '';
//     } else {
//       alert("Failed to subtract amount.");
//     }
//   } catch (error) {
//     console.error("Error in subtractAmount:", error);
//     alert("Failed to subtract amount.");
//   }
// };





//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------


import { apiUrl } from './config.js';
import { amountInputEl } from './domElements.js';
import { fetchSavings } from './fetchSavings.js';

export const subtractAmount = async () => {
  const amount = parseFloat(amountInputEl.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: -amount }),
    });

    if (response.ok) {
      await fetchSavings();
      amountInputEl.value = "";
    } else {
      alert("Failed to subtract amount.");
    }
  } catch (error) {
    console.error("Error subtracting amount:", error);
    alert("Error subtracting amount.");
  }
};
