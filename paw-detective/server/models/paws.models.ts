import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface PawInterface {
  lostOrFound: boolean,
  picture: string,
  animal: string,
  description: string,
  date: any,
  location: string,
  lat: number,
  long: number,
  email: string
}

const PawsSchema = new Schema<PawInterface>({
  lostOrFound: { type: Boolean, required: true },
  picture: { type: String, required: true },
  animal: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  location: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  email: { type: String, required: true },
});

export default mongoose.model("Paws", PawsSchema);