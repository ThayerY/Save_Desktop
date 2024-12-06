import Saving from "../../models/Saving.js";

export const getSavings = async (req, res) => {
  try {
    const savings = await Saving.find();
    res.json(savings);
  } catch (error) {
    console.error("Error in GET /api/savings:", error.message);
    res.status(500).json({ error: "Failed to fetch savings." });
  }
};
