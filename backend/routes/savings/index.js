import express from "express";
import { getSavings } from "./getSavings.js";
import { postSaving } from "./postSaving.js";
import { putSaving } from "./putSaving.js";
import { deleteSaving } from "./deleteSaving.js";

const router = express.Router();

router.get("/", getSavings);
router.post("/", postSaving);
router.put("/:id", putSaving);
router.delete("/:id", deleteSaving);

export default router;
