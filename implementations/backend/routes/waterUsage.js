import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

const waterSchema = new mongoose.Schema({
    waterUsageData: { type: Object, required: true },
    totalWaterUsage: { type: Number, required: false },
    inputDate: { type: String, required: true },
    inputDayAbr: { type: String, required: true },
    userId : { type: String, required: true },
    carbonEmissionsWater : { type: Number, required: false }
});

const WaterUsage = mongoose.model("WaterUsage", waterSchema);

router.route("/getWaterUsageData")
    .get((req, res) => {
        WaterUsage.find()
            .then((waterData) => res.json(waterData))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/getUserWaterEntryForDay")
    .get((req, res) => {

        const { userId, inputDate } = req.query;
        if (!userId) {
            res.status(400).send('userId query parameter is required');
        }
        if (!inputDate) {
            res.status(400).send('inputDate query parameter is required');
        }
        /*
        WasteManagement.find({ userId: new mongoose.Types.ObjectId(userId) })
            .then((items) => res.json(items))
            .catch((err) => res.status(400).json("Error: " + err));
            */
        WaterUsage.find({ userId: userId, inputDate : inputDate })
            .then((items) => res.json(items))
            .catch((err) => res.status(400).json("Error: " + err));   

    });

router.route("/getDailyWaterUsageChartData")
    .get(async (req, res) => {
        try {
            const userId = req.query.userId; 
            if (!userId) {
                return res.status(400).json({ message: "UserId is required" });
            }
            
            res.json(await getDayWiseWaterUsage(userId));
        } catch (error) {
            console.error("Error fetching daily water usage data:", error);
            res.status(500).json({ error: "An error occurred while fetching data." });
        }
    });

// Function to get day wise water usage
export const getDayWiseWaterUsage = async (userId) => {
    try {
        const result = await WaterUsage.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: "$inputDayAbr",             
                    totalWaterUsage: { $sum: "$totalWaterUsage" }  
                }
            },
            {
                $sort: { _id: 1 } 
            }
        ]);

        const formattedResult = result.reduce((acc, curr) => {
            acc[curr._id] = curr.totalWaterUsage;
            return acc;
        }, {});

        return formattedResult; 
    } catch (error) {
        throw new Error("Error fetching daily water usage data: " + error.message);
    }
};
// router.route("/getUser/:id")
//     .get((req, res) => {
//         User.findById(req.params.id)
//             .then((item) => res.json(user))
//             .catch((err) => res.status(400).json("Error: " + err));
//     });

router.route("/newWaterUsageEntry")
    .post((req, res) => {
        const userId = req.body.userId;
        const inputDate = req.body.inputDate;
        const inputDayAbr = req.body.inputDayAbr;
        const waterUsageData = req.body.waterUsageData;
        const totalWaterUsage = req.body.totalWaterUsage;
        const carbonEmissionsWater = req.body.carbonEmissionsWater;

        // create a new WaterUsage object 
        const newWaterUsageEntry = new WaterUsage({
            userId,
            inputDate,
            inputDayAbr,
            waterUsageData,
            totalWaterUsage,
            carbonEmissionsWater
        });

        // save the new object (newWaterUsageEntry)
        newWaterUsageEntry
            .save()
            .then(() => res.json("New Water Usage Entry added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/waterUsage/:id")
    .put((req, res) => {
        WaterUsage.findById(req.params.id)
            .then((waterData) => {
                waterData.userId = req.body.userId;
                waterData.inputDate = req.body.inputDate;
                waterData.inputDayAbr = req.body.inputDayAbr;
                waterData.waterUsageData = req.body.waterUsageData;
                waterData.totalWaterUsage = req.body.totalWaterUsage;
                waterData.carbonEmissionsWater = req.body.carbonEmissionsWater;

                waterData
                    .save()
                    .then(() => res.json("Water Usage entry updated!"))
                    .catch((err) => res.status(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
    });

// Function to get the last week's total water usage
export const getLastWeekWaterUsage = async (userId) => {
    try {
        // Get today's date and the date one week ago
        const today = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);

        const waterUsage = await WaterUsage.find({
            userId,
            inputDate: {
                $gte: lastWeek.toISOString().split('T')[0], // Convert to YYYY-MM-DD
                $lte: today.toISOString().split('T')[0]
            }
        });

        const totalWaterUsage = waterUsage.reduce((total, entry) => {
            const dailyTotal = entry.totalWaterUsage || 0;
            return total + dailyTotal;
        }, 0);

        return totalWaterUsage; 
    } catch (error) {
        throw new Error("Failed to retrieve water usage data: " + error.message);
    }
};

// router.route("/user/:id")
//     .delete((req, res) => {
//         User.findByIdAndDelete(req.params.id)
//             .then(() => res.json("User deleted."))
//             .catch((err) => res.status(400).json("Error: " + err));
//     });

export default router;