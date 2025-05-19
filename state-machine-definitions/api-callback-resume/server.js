const https = require("https");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const { StepFunctions } = require("aws-sdk");

const app = express();
app.use(bodyParser.json());

const stepfunctions = new StepFunctions({
    endpoint: "http://localhost:8083",
    region: "local"
});

// SSL/TLS certificate paths
const sslOptions = {
    key: fs.readFileSync("./state-machine-definitions/api-callback-resume/certs/server.key"),
    cert: fs.readFileSync("./state-machine-definitions/api-callback-resume/certs/server.crt")
};

// 1. Log incoming task token and request data
app.post("/callback", (req, res) => {
    console.log("Received callback request:", req.body);
    res.status(200).send({ message: "Received the callback." });
});

// 2. Simulate a successful task
app.post("/pass-task", async (req, res) => {
    const { taskToken } = req.body;
    try {
        const response = await stepfunctions.sendTaskSuccess({
            taskToken: taskToken,
            output: JSON.stringify({ status: "SUCCESS" })
        }).promise();
        
        console.log("Task completed successfully:", response);
        res.status(200).send({ message: "Task marked as SUCCESS." });
    } catch (error) {
        console.error("Error completing task:", error);
        res.status(500).send({ error: "Failed to complete task." });
    }
});

// 3. Simulate a failed task
app.post("/fail-task", async (req, res) => {
    const { taskToken } = req.body;
    try {
        const response = await stepfunctions.sendTaskFailure({
            taskToken: taskToken,
            error: "TaskFailed",
            cause: "Simulated failure"
        }).promise();
        
        console.log("Task failed:", response);
        res.status(200).send({ message: "Task marked as FAIL." });
    } catch (error) {
        console.error("Error failing task:", error);
        res.status(500).send({ error: "Failed to mark task as FAIL." });
    }
});

// Start the server
https.createServer(sslOptions, app).listen(3000, () => {
    console.log("Secure server running on https://localhost:3000");
});