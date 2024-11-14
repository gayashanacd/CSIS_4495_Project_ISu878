import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

const carbonFootprintSchema = new mongoose.Schema({
    transportData: { type: [Object], required: true },
    homeData: { type: Object, required: true },
    inputDate: { type: String, required: true },
    userId : { type: String, required: true },
    carbonEmissionsEnergy : { type: Number, required: false },
    transportEmissions : { type: Number, required: false },
    homeEnergyEmissions : { type: Number, required: false },
    householdSize: { type: Number, required: false },
    city: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const CarbonFootprint = mongoose.model("CarbonFootprint", carbonFootprintSchema);

router.route("/getEnergyData")
    .get((req, res) => {
        CarbonFootprint.find()
            .then((energyData) => res.json(energyData))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/getUserEnergyEntryForDay")
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
        CarbonFootprint.find({ userId: userId, inputDate : inputDate })
            .then((items) => res.json(items))
            .catch((err) => res.status(400).json("Error: " + err));   
    });

// router.route("/getUser/:id")
//     .get((req, res) => {
//         User.findById(req.params.id)
//             .then((item) => res.json(user))
//             .catch((err) => res.status(400).json("Error: " + err));
//     });

router.route("/newCarbonFootprintEntry")
    .post((req, res) => {
        const userId = req.body.userId;
        const inputDate = req.body.inputDate;
        const transportData = req.body.transportData;
        const homeData = req.body.homeData;
        const carbonEmissionsEnergy = req.body.carbonEmissionsEnergy;
        const transportEmissions = req.body.transportEmissions;
        const homeEnergyEmissions = req.body.homeEnergyEmissions;
        const householdSize = req.body.householdSize;
        const city = req.body.city;
        
        // create a new CarbonFootprint object 
        const newCarbonFootprintEntry = new CarbonFootprint({
            userId,
            inputDate,
            transportData,
            homeData,
            carbonEmissionsEnergy,
            transportEmissions,
            homeEnergyEmissions,
            householdSize,
            city
        });

        // save the new object (newCarbonFootprintEntry)
        newCarbonFootprintEntry
            .save()
            .then(() => res.json("New Carbon Footprint Entry added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/carbonFootprint/:id")
    .put((req, res) => {
        CarbonFootprint.findById(req.params.id)
            .then((energyData) => {
                energyData.userId = req.body.userId;
                energyData.inputDate = req.body.inputDate;
                energyData.transportData = req.body.transportData;
                energyData.homeData = req.body.homeData;
                energyData.carbonEmissionsEnergy = req.body.carbonEmissionsEnergy;
                energyData.transportEmissions = req.body.transportEmissions;
                energyData.homeEnergyEmissions = req.body.homeEnergyEmissions;
                energyData.householdSize = req.body.householdSize;
                energyData.city = req.body.city;

                energyData
                    .save()
                    .then(() => res.json("Carbon Footprint entry updated!"))
                    .catch((err) => res.status(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
    });

// router.route("/user/:id")
//     .delete((req, res) => {
//         User.findByIdAndDelete(req.params.id)
//             .then(() => res.json("User deleted."))
//             .catch((err) => res.status(400).json("Error: " + err));
//     });

// Function to get the last week's total carbon footprint
export const getLastWeekCarbonFootprint = async (userId) => {
    try {
        // Get today's date and the date one week ago
        const today = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);

        // Find carbon footprint entries for the last week for the given userId
        const footprints = await CarbonFootprint.find({
            userId,
            inputDate: {
                $gte: lastWeek.toISOString().split('T')[0], // Convert to YYYY-MM-DD
                $lte: today.toISOString().split('T')[0]
            }
        });

        // Calculate total footprint
        const totalFootprint = footprints.reduce((total, entry) => {
            const dailyTotal = (entry.carbonEmissionsEnergy || 0) + (entry.transportEmissions || 0) + (entry.homeEnergyEmissions || 0);
            return total + dailyTotal;
        }, 0);

        return totalFootprint; // Return the total footprint
    } catch (error) {
        throw new Error("Failed to retrieve carbon footprint data: " + error.message);
    }
};


// Function to calculate daily average electricity usage for a given userId
export const calculateDailyAverageElectricityUsage = async (userId) => {
    try {
        const footprints = await CarbonFootprint.find({ userId });

        const electricityEntries = footprints
            .filter(entry => entry.homeData?.enerySource === "Electricity" && entry.homeData.electricityUsage !== undefined);

        const totalElectricityUsage = electricityEntries.reduce((total, entry) => {
            return total + (entry.homeData.electricityUsage || 0);
        }, 0);

        const averageElectricityUsage = electricityEntries.length ? (totalElectricityUsage / electricityEntries.length) : 0;

        return averageElectricityUsage;
    } catch (error) {
        throw new Error("Failed to calculate daily average electricity usage: " + error.message);
    }
};

export default router;