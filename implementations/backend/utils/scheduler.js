import cron from 'node-cron';
import RecommendationEngine from '../utils/recommendationEngine.js';
import { getAllUserIds } from '../routes/users.js';

// Function to run weekly
const runWeeklyTask = async () => {
    try {
        const userIds = await getAllUserIds(); // Fetch all user IDs
        for (const userId of userIds) {
            const recommendationEngine = new RecommendationEngine(userId);
            recommendationEngine.init();
        }
    } catch (error) {
        console.error("Error running weekly task:", error.message);
    }
};

// Schedule the task to run every Sunday at midnight
cron.schedule('0 0 * * 0', runWeeklyTask);
console.log('Weekly task scheduled to run every Sunday at midnight');