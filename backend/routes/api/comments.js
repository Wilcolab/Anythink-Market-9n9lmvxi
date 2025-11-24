/**
 * Router handling comment-related API endpoints.
 *
 * @module routes/api/comments
 *
 * @requires express.Router
 * @requires mongoose.model:Comment
 *
 * @description
 * Provides endpoints to:
 *  - GET /        : Retrieve all comments.
 *  - DELETE /:id  : Delete a comment by its ObjectId.
 *
 * @example
 * // Mounted at /api/comments
 * // GET  /api/comments
 * // DELETE /api/comments/:id
 *
 * @route GET /
 * @async
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends JSON array of comments on success or 500 on failure.
 *
 * @route DELETE /:id
 * @async
 * @param {import('express').Request} req - Express request object. Expects `req.params.id` as the comment ObjectId.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware for error handling.
 * @returns {Promise<void>} Sends 200 on successful deletion, 404 if not found, or forwards error to next().
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await Comment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Comment not found" });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

module.exports = router;