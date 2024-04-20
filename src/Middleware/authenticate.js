const jwtProvider = require('../Configs/jwtProvider.js');
const userView = require('../Views/userView.js');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ error: "Token not found" });
        }

        const userId = await jwtProvider.getUserIdFromToken(token);
        const user = await userView.getUserByIdentifier(userId);

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        req.user = user;
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
    next();
}

module.exports = authenticate;