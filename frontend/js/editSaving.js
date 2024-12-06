// // Edit a saving entry inline within the table

import { apiUrl } from './config.js';
import { fetchSavings } from './fetchSavings.js';
import convertTo12 from './convertTime.js';

export const attachEditListeners = () => {
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      editSavingInline(button);
    });
  });
};

const editSavingInline = (button) => {
  const id = button.dataset.id;
  const row = button.closest("tr");

  // Use data attributes directly from the button
  const originalAmount = parseFloat(button.dataset.amount);
  const originalDate = button.dataset.date;
  const originalToday = button.dataset.today;
  const originalTime = button.dataset.time;

  const amountCell = row.children[0];
  const dateCell = row.children[3];
  const todayCell = row.children[4];
  const timeCell = row.children[5];

  // Create input fields for editing
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.value = originalAmount;
  amountInput.className = "edit-input";

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = originalDate;
  dateInput.className = "edit-date-input";

  const todayInput = document.createElement("input");
  todayInput.type = "text";
  todayInput.value = originalToday;
  todayInput.className = "edit-today-input";

  const timeInput = document.createElement("input");
  timeInput.type = "time";
  timeInput.value = originalTime; // Will be converted later if needed
  timeInput.className = "edit-time-input";

  // Replace cell content with input fields
  amountCell.innerHTML = "";
  dateCell.innerHTML = "";
  todayCell.innerHTML = "";
  timeCell.innerHTML = "";

  amountCell.appendChild(amountInput);
  dateCell.appendChild(dateInput);
  todayCell.appendChild(todayInput);
  timeCell.appendChild(timeInput);

  // Change Edit button to Save button
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.className = "save-btn";
  button.replaceWith(saveBtn);

  // Save changes logic remains the same
  saveBtn.addEventListener("click", async () => {
    const newAmount = parseFloat(amountInput.value);
    const newDate = dateInput.value;
    const newToday = todayInput.value;
    const newTime = timeInput.value;

    if (!newAmount || isNaN(newAmount) || !newDate || !newToday || !newTime) {
      alert("Please enter valid values for all fields.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: newAmount,
          date: newDate,
          today: newToday,
          time: newTime,
        }),
      });

      if (response.ok) {
        fetchSavings();
      } else {
        alert("Failed to update the entry.");
      }
    } catch (error) {
      console.error("Error updating entry:", error);
      alert("Error updating entry.");
    }
  });
};
