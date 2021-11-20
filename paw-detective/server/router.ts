import express from "express";
import paws from "./controllers/paws.controllers";
import checkJwt from "./authz/check-jwt";

const router = express.Router();

router.get("/paws", paws.getPaws);
router.put("/paws", paws.putPaws)
router.post("/paws", paws.postPaws);
router.delete("/paws/:id",paws.deletePaws);

export default router;
