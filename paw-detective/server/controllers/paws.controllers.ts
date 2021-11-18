import Paws from "../models/paws.models";
import express = require('express');

const getPaws = async (req:express.Request, res:express.Response) => {
  try {
    const paws = await Paws.find();
    res.status(200);
    res.send(paws);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const createPaws = async (req:express.Request, res:express.Response) => {
  try {
    const {
      lostOrFound,
      picture,
      animal,
      description,
      location,
      lat,
      long,
      email,
    } = req.body;
    const paws = await Paws.create({
      lostOrFound,
      picture,
      animal,
      description,
      location,
      lat,
      long,
      email,
    });
    res.status(201);
    res.send(paws);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const deletePaws = async (req:express.Request, res:express.Response) => {
  try {
    await Paws.deleteOne({ id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export default {
  getPaws,
  createPaws,
  deletePaws,
};
