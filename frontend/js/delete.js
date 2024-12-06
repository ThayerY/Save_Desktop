import { apiUrl } from './config.js';
import { fetchSavings } from './fetchSavings.js';

export const attachDeleteListeners = () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchSavings();
        } else {
          alert("Failed to delete entry.");
        }
      } catch (error) {
        console.error("Error deleting entry:", error);
        alert("Error deleting entry.");
      }
    });
  });
};
