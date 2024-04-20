const userView = require("../Views/userView.js");
const jwtProvider = require("../Configs/jwtProvider.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const user = await userView.createUser(req.body);
        const jwt = jwtProvider.generateToken(user);

        return res.status(200).send({ jwt, message: "Register success" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        const user = await userView.getUserByEmail(email);
        console.log("login: ",user);
        

        if (!user) {
            return res.status(404).send({ message: "User not found with email: " + email });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }

        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({ jwt, message: "Login success" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { register, login };
