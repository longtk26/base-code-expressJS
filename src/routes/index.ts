import { Router } from "express";

const indexRoute = Router();

indexRoute.get("/v1/api", (req, res) => {
    res.send("Hello World")
})

export default indexRoute