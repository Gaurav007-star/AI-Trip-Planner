import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    trip: {
      type: Object,
      require: true
    },
    choice: {
      type: Object,
      require: true
    },
    email: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
);

const TripModal = mongoose.model("trip", tripSchema);
export default TripModal;
