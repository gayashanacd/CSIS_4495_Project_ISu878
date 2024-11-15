import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

const feedSchema = new mongoose.Schema({
    title: { type: String, required: true },
    uniqueId: { type: String, required: true },
    metaData: { type: Object, required: false },
    userId : { type: String, required: true },
    likeUserIds : { type: [String], required: false, default: [] },
    isArchived: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Feed = mongoose.model("Feed", feedSchema);

router.route("/getFeeds")
    .get((req, res) => {
        Feed.find()
            .then((feeds) => res.json(feeds))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/feed/:id")
    .get((req, res) => {
        Feed.findById(req.params.id)
            .then((feed) => res.json(feed))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/getOthersFeeds")
    .get(async (req, res) => {
        const { userId, limit } = req.query;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        try {
            const otherFeeds = await Feed.find({ userId: { $ne: userId }, isArchived: false })
                .sort({ createdAt: -1 })  // Sort by createdAt in descending order (latest first)
                .limit(limit || 10);  // Limit to 10 feeds

            res.status(200).json(otherFeeds);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while fetching feeds" });
        }
    });


router.route("/patchLikeUsers")
    .patch(async (req, res) => {
        const { feedId, userId, action } = req.body; // Extract feedId, userId, and action from request body

        if (!feedId || !userId || !action) {
            return res.status(400).json({ error: "feedId, userId, and action are required." });
        }

        try {
            let updateOperation;

            // Decide the operation based on the action (add or remove)
            if (action === "add") {
                updateOperation = { $addToSet: { likeUserIds: userId } }; // Add userId if not already present
            } else if (action === "remove") {
                updateOperation = { $pull: { likeUserIds: userId } }; // Remove userId
            } else {
                return res.status(400).json({ error: "Invalid action. Use 'add' or 'remove'." });
            }

            // Update the feed document
            const updatedFeed = await Feed.findByIdAndUpdate(feedId, updateOperation, { new: true });

            if (!updatedFeed) {
                return res.status(404).json({ error: "Feed not found." });
            }

            res.status(200).json(updatedFeed); 
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while updating the feed." });
        }
    });

export const createFeed = async (feedData) => {
    try {
        const feed = new Feed(feedData);
        const savedFeed = await feed.save();
        return savedFeed;
    } catch (error) {
        throw new Error("Failed to create feed: " + error.message);
    }
};

export const updateFeed = async (feedData) => {
    try {
        const savedFeed = await feedData.save();
        return savedFeed;
    } catch (error) {
        throw new Error("Failed to update feed: " + error.message);
    }
};

export const checkFeeduplicate = async (payload) => {
    try {
        const feed = await Feed.find(payload);
        return feed;
    } catch (error) {
        throw new Error("Failed to fetch feed: " + error.message);
    }
};

export default router;