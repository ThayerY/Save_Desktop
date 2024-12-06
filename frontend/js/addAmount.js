import { apiUrl } from './config.js';
import { amountInputEl } from './domElements.js';
import { fetchSavings } from './fetchSavings.js';

export const addAmount = async () => {
  const amount = parseFloat(amountInputEl.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    if (response.ok) {
      await fetchSavings();
      amountInputEl.value = "";
    } else {
      alert("Failed to add amount.");
    }
  } catch (error) {
    console.error("Error adding amount:", error);
    alert("Error adding amount.");
  }
};
