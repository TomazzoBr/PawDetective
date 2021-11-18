import express from "express";
import paws from "./controllers/paws.controllers";
import checkJwt from "./authz/check-jwt";

const router = express.Router();

router.get("/paws", paws.getPaws);
router.put("/paws", checkJwt, paws.putPaws)
router.post("/paws", checkJwt, paws.postPaws);
router.delete("/paws/:id",checkJwt, paws.deletePaws);

export default router;
