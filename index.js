const express = require("express");
const path = require("path");
const fs = require("fs");
const url = require("url");
const { dataSmartphone, templ, filterByParam } = require("./data/data");

const app = express();
const port = 3000;

const stTemplates = fs.readFileSync("./templates/smartBlock.html", "utf-8");
const mainSend = fs.readFileSync(path.join(__dirname, "./templates/mainSend.html"), "utf-8");

app.use(express.static("public"));
app.use(express.json());

app.get("/getSmartphoneByBrand", (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let dataFromServer = JSON.parse(JSON.stringify(dataSmartphone(parsedUrl.query.brand))); // apple
    console.log(dataFromServer);
    let sendDataToUser = mainSend.replace("{{content}}", dataFromServer.map((item) => templ(stTemplates, item)).join(""));
    res.status(200).send(sendDataToUser);
});

app.post("/getSmartphoneByParam", (req, res) => {
    let filterObj = filterByParam(req.body);
    let sendDataToUser = mainSend.replace("{{content}}", filterObj.map((item) => templ(stTemplates, item)).join(""));
    res.status(200).send(sendDataToUser);
});

app.use((req, res, next) => {
    res.status(404).send("<h1>Not found :(</h1>");
});

app.listen(port);
