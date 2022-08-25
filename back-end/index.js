const app = require("express")();
const crypto = require("crypto");
const cors = require("cors");
const bp = require('body-parser');
require("dotenv").config();

app.use(bp.json());
app.use(cors());
app.use(bp.urlencoded({ extended: false }))

const key = process.env.CRYPTO_KEY;
console.log(key);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log("page");
    res.send("<h1>Server</h1>");
});

app.post("/", cors(), (req, res) => {
    let pHash1 = crypto
        .createHash("sha256")
        .update(key + req.body.password)
        .digest("hex");

    let pHash2 = crypto
        .createHash("sha256")
        .update(req.body.email.split("@")[0] + req.body.password)
        .digest("hex");

    res.json({ pass1: pHash1, pass2: pHash2 });

});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});