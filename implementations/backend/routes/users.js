import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: false },
    address: { type: String, required: false },
    dob: { type: String, required: false },
    energyPreferences: {type: Object, required: false},
    transportPreferences: {type: Object, required: false},
    waterHabits: {type: Object, required: false},
    imgUrl: { type: String, required: false },
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

router.route('/register').post(async (req, res) => {
    try {
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

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // create a new user object 
        const newUser = new User({
            userName,
            password: hashedPassword,
            name,
            email,
            address,
            dob,
            imgUrl,
            energyPreferences,
            transportPreferences,
            waterHabits
        });

        // Save the user to the database asynchronously
        await newUser.save();

        // Send the added user
        // res.status(201).json({ message: "User added!" });
        res.json(newUser);
    } catch (error) {
        // Handle errors and send an error response
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
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


router.route("/login")
    .post(async (req, res) => {
        try {
            const { userName, password } = req.body;

            if (!userName) {
                return res.status(400).send('Username is required');
            }
            if (!password) {
                return res.status(400).send('Password is required');
            }

            // Find user by username
            const user = await User.findOne({ userName });

            if (!user) {
                return res.status(400).send('Invalid username or password');
            }

            // Compare entered password with stored hashed password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).send('Invalid username or password');
            }

            res.json(user)
        } catch (error) {
            // Log the error for debugging purposes
            console.error("Error during login:", error);

            // Send a 500 response with error details
            res.status(500).json({ message: "Error during login", error: error.message });
        }
    });

export default router;