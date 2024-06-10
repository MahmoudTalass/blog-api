const express = require("express");
const router = express.Router();

/**
 * Endpoint to retrieve all comments
 */
router.get("/");

/**
 * Endpoint to create a new comment
 */
router.post("/");

/**
 * Endpoint to update a particular comment
 */
router.put("/:commentId");

/**
 * Endpoint to delete a particular comment
 */
router.delete("/:commentId");

module.exports = router;
