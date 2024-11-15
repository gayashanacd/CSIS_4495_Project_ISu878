import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    metaData: { type: Object, required: false },
    userIds : { type: [String], required: false, default: [] },
    isArchived: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model("Event", eventSchema);

router.route("/getEvents")
    .get((req, res) => {
        Event.find()
            .then((events) => res.json(events))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/event/:id")
    .get((req, res) => {
        Event.findById(req.params.id)
            .then((event) => res.json(event))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/getUserEvents")
    .get(async (req, res) => {
        const { userId } = req.query; 

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        try {
            const query = { userIds: { $in: [userId] } };

            const events = await Event.find(query);

            res.status(200).json(events);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while fetching events" });
        }
    });

router.route("/joinLeaveEvent")
    .patch(async (req, res) => {
        const { eventId, userId, action } = req.body; // Extract eventId, userId, and action from request body

        if (!eventId || !userId || !action) {
            return res.status(400).json({ error: "eventId, userId, and action are required." });
        }

        try {
            let updateOperation;

            // Decide the operation based on the action (add or remove)
            if (action === "add") {
                updateOperation = { $addToSet: { userIds: userId } }; // Add userId if not already present
            } else if (action === "remove") {
                updateOperation = { $pull: { userIds: userId } }; // Remove userId
            } else {
                return res.status(400).json({ error: "Invalid action. Use 'add' or 'remove'." });
            }

            // Update the event document
            const updatedEvent = await Event.findByIdAndUpdate(eventId, updateOperation, { new: true });

            if (!updatedEvent) {
                return res.status(404).json({ error: "Event not found." });
            }

            res.status(200).json(updatedEvent); // Return the updated document
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while updating the event." });
        }
    });

export default router;