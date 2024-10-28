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
    homeEnergyEmissions : { type: Number, required: false }
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
        
        // create a new CarbonFootprint object 
        const newCarbonFootprintEntry = new CarbonFootprint({
            userId,
            inputDate,
            transportData,
            homeData,
            carbonEmissionsEnergy,
            transportEmissions,
            homeEnergyEmissions
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

export default router;