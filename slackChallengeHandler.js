
module.exports = async (req, res) => {
    if (req.body.type === 'url_verification') {
        console.log("URL Verification Challenge Received");
        return res.status(200).json({ challenge: req.body.challenge });
    }

    res.status(200).end();
};
