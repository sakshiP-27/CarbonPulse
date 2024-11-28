import express from "express";

import activityController from "../../controllers/activityController";

const activityRouter = express.Router();

activityRouter.get("/", activityController.logNewActivity);

activityRouter.post("/log", activityController.logNewActivity);

activityRouter.get("/logs", activityController.getUserActivityLogs);

export default activityRouter;