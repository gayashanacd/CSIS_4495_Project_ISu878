import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

const wasteSchema = new mongoose.Schema({
    wasteData: { type: [Object], required: true },
    totalWaste :  { type: Number, required: false },
    inputDate: { type: String, required: true },
    userId : { type: String, required: true },
    carbonEmissionsWaste : { type: Number, required: false },
    createdAt: { type: Date, default: Date.now }
});

const WasteManagement = mongoose.model("WasteManagement", wasteSchema);

router.route("/getWasteData")
    .get((req, res) => {
        WasteManagement.find()
            .then((wasteData) => res.json(wasteData))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/getUserWasteEntryForDay")
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
        WasteManagement.find({ userId: userId, inputDate : inputDate })
            .then((items) => res.json(items))
            .catch((err) => res.status(400).json("Error: " + err));   

    });

// router.route("/getUser/:id")
//     .get((req, res) => {
//         User.findById(req.params.id)
//             .then((item) => res.json(user))
//             .catch((err) => res.status(400).json("Error: " + err));
//     });

router.route("/newWasteManagementEntry")
    .post((req, res) => {
        const userId = req.body.userId;
        const inputDate = req.body.inputDate;
        const wasteData = req.body.wasteData;
        const totalWaste = req.body.totalWaste;
        const carbonEmissionsWaste = req.body.carbonEmissionsWaste;

        // create a new WasteManagement object 
        const newWasteManagementEntry = new WasteManagement({
            userId,
            inputDate,
            wasteData,
            totalWaste,
            carbonEmissionsWaste
        });

        // save the new object (newWasteManagementEntry)
        newWasteManagementEntry
            .save()
            .then(() => res.json("New Waste Management Entry added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/wasteManagement/:id")
    .put((req, res) => {
        WasteManagement.findById(req.params.id)
            .then((wasteData) => {
                wasteData.userId = req.body.userId;
                wasteData.inputDate = req.body.inputDate;
                wasteData.wasteData = req.body.wasteData;
                wasteData.totalWaste = req.body.totalWaste;
                wasteData.carbonEmissionsWaste = req.body.carbonEmissionsWaste;

                wasteData
                    .save()
                    .then(() => res.json("Waste Management entry updated!"))
                    .catch((err) => res.status(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
    });

// Function to get the last week's or given period total waste generation
export const getLastWeekWasteData = async (userId, dates) => {
    try {
        let today = new Date();
        let lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);

        if(dates && dates.from && dates.to){
            today = dates.to;
            lastWeek = dates.from;
        }

        const wasteData = await WasteManagement.find({
            userId,
            inputDate: {
                $gte: lastWeek.toISOString().split('T')[0], // Convert to YYYY-MM-DD
                $lte: today.toISOString().split('T')[0]
            }
        });

        const totalWasteData= wasteData.reduce((total, entry) => {
            const dailyTotal = entry.totalWaste || 0;
            return total + dailyTotal;
        }, 0);

        return totalWasteData; 
    } catch (error) {
        throw new Error("Failed to retrieve waste data: " + error.message);
    }
};

// router.route("/user/:id")
//     .delete((req, res) => {
//         User.findByIdAndDelete(req.params.id)
//             .then(() => res.json("User deleted."))
//             .catch((err) => res.status(400).json("Error: " + err));
//     });

export default router;