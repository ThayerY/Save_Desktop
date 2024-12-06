import Saving from "../../models/Saving.js";

export const deleteSaving = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSaving = await Saving.findByIdAndDelete(id);
    if (!deletedSaving) {
      return res.status(404).json({ message: "Saving not found." });
    }

    // Recalculate currentAmount and totalAmount for remaining records
    const allSavings = await Saving.find();
    let runningTotal = 0;

    for (const saving of allSavings) {
      runningTotal += saving.amount;
      await Saving.findByIdAndUpdate(saving._id, {
        currentAmount: runningTotal - saving.amount,
        totalAmount: runningTotal,
      });
    }

    res.status(200).json({ message: "Saving deleted successfully." });
  } catch (error) {
    console.error("Error deleting saving:", error);
    res.status(500).json({ error: "Failed to delete saving." });
  }
};
