import Saving from "../../models/Saving.js";
import convertTo12 from "../../utils/convertTime.js";

export const postSaving = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount." });
    }

    // Fetch all existing savings to calculate currentAmount and totalAmount
    const existingSavings = await Saving.find();
    const currentTotal = existingSavings.reduce((sum, saving) => sum + saving.amount, 0);

    const now = new Date();
    const today = now.toLocaleDateString("en-US", { weekday: "long" });
    const formattedTime = convertTo12(now.toTimeString().split(" ")[0]);

    const saving = new Saving({
      amount,
      currentAmount: currentTotal,
      totalAmount: currentTotal + amount,
      date: now.toISOString().split("T")[0],
      today,
      time: formattedTime,
    });

    const savedData = await saving.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Server error." });
  }
};
