import { fetchSavings } from './fetchSavings.js';
import { addAmount } from './addAmount.js';
import { subtractAmount } from './subtractAmount.js';
import { addAmountBtn, subtractAmountBtn } from './domElements.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initial fetch of data
  fetchSavings();

  // Set up event listeners for adding/subtracting amounts
  addAmountBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addAmount();
  });

  subtractAmountBtn.addEventListener("click", (event) => {
    event.preventDefault();
    subtractAmount();
  });
});
