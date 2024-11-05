import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import RecommendationEngine from '../utils/recommendationEngine.js';

const recommendationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: false },
    type: { type: String, required: true },
    userId : { type: String, required: true },
    isArchived: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

router.route("/runRecommendations/:userId").get((req, res) => {
    try {
        const recommendationEngine = new RecommendationEngine(req.params.userId);
        recommendationEngine.init();
        res.status(201).json({ message: "Started running recommendation engine" });
    } catch (error) {
        console.error("Error running recommendation engine:", error);
        res.status(500).json({ message: "Error running recommendation engine", error: error.message });
    }         
});

router.route("/getRecommendations")
    .get((req, res) => {
        Recommendation.find()
            .then((recommendations) => res.json(recommendations))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/getRecommendation/:id")
    .get((req, res) => {
        Recommendation.findById(req.params.id)
            .then((recommendation) => res.json(recommendation))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/getUserRecommendations")
    .get((req, res) => {
        const { userId } = req.query;
        if (!userId) {
            res.status(400).send('userId query parameter is required');
        }

        Recommendation.find({ userId: userId, isArchived : false })
            .then((recommendations) => res.json(recommendations))
            .catch((err) => res.status(400).json("Error: " + err));   
    });

export const createRecommendation = async (recommendationData) => {
    try {
        const recommendation = new Recommendation(recommendationData);
        const savedRecommendation = await recommendation.save();
        return savedRecommendation;
    } catch (error) {
        throw new Error("Failed to create recommendation: " + error.message);
    }
};

export default router;