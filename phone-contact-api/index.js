const { json } = require("express");
const express = require("express");
const cors = require("cors");
const contactController = require("./controllers/contactController");
const app = express();
const port = 3000;

app.use(json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/contacts", contactController);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
