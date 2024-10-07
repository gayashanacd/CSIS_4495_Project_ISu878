import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: false },
    address: { type: String, required: false },
    dob: { type: Date, required: false },
    energyPreferences: {type: Object, required: false},
    transportPreferences: {type: Object, required: false},
    waterHabits: {type: Object, required: false},
    imgUrl: { type: String, required: false },
    // count: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

router.route("/getUsers")
    .get((req, res) => {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/getUser/:id")
    .get((req, res) => {
        User.findById(req.params.id)
            .then((item) => res.json(user))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/newUser")
    .post((req, res) => {
        const userName = req.body.userName;
        const password = req.body.password;
        const name = req.body.name;
        const email = req.body.email;
        const address = req.body.address;
        const dob = req.body.dob;
        const imgUrl = req.body.imgUrl;
        const energyPreferences = req.body.energyPreferences;
        const transportPreferences = req.body.transportPreferences;
        const waterHabits = req.body.waterHabits

        // create a new user object 
        const newUser = new User({
            userName,
            password,
            name,
            email,
            address,
            dob,
            imgUrl,
            energyPreferences,
            transportPreferences,
            waterHabits
        });

        // save the new object (newUser)
        newUser
            .save()
            .then(() => res.json("User added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/user/:id")
    .put((req, res) => {
        User.findById(req.params.id)
            .then((user) => {
                user.userName = req.body.userName;
                user.password = req.body.password;
                user.name = req.body.name;
                user.email = req.body.email;
                user.dob = req.body.dob;
                user.imgUrl = req.body.imgUrl;
                user.energyPreferences = req.body.energyPreferences;
                user.transportPreferences = req.body.transportPreferences;
                user.waterHabits = req.body.waterHabits;

                user
                    .save()
                    .then(() => res.json("User updated!"))
                    .catch((err) => res.status(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/user/:id")
    .delete((req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then(() => res.json("User deleted."))
            .catch((err) => res.status(400).json("Error: " + err));
    });

export default router;