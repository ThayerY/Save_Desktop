import Saving from "../../models/Saving.js";
import convertTo12 from "../../utils/convertTime.js";

export const putSaving = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, time } = req.body;

    if (!id || isNaN(amount) || !date || !time) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    const newDate = new Date(date);
    const today = newDate.toLocaleDateString("en-US", { weekday: "long" });
    const savings = await Saving.find().sort({ date: 1, time: 1 });

    let runningTotal = 0;
    let updatedSaving = null;

    for (const saving of savings) {
      if (saving._id.toString() === id) {
        saving.amount = amount;
        saving.date = date;
        saving.today = today;
        saving.time = convertTo12(time);
        saving.currentAmount = runningTotal;
        saving.totalAmount = runningTotal + amount;
        updatedSaving = saving;
      } else {
        saving.currentAmount = runningTotal;
        saving.totalAmount = runningTotal + saving.amount;
      }

      runningTotal += saving.amount;
      await saving.save();
    }

    if (!updatedSaving) {
      return res.status(404).json({ error: "Saving not found." });
    }

    res.json(updatedSaving);
  } catch (error) {
    console.error("Error updating saving:", error);
    res.status(500).json({ error: "Server error." });
  }
};
