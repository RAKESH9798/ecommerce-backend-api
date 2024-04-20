const userView = require("../Views/userView.js");

const getUserProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1]; 
        console.log(jwt);

        if (!jwt) {
            return res.status(401).send({ error: "Token not found" });
        }

        const user = await userView.getUserProfileByToken(jwt);
        console.log(user);

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userView.getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { getUserProfile, getAllUsers };
