import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    title: { type: String, require: true, unique: true },
    price: { type: Number, require: true },
    desc: { type: String, require: true },
    maxPeople: { type: Number, require: true },
    roomNumbers: {
      type: [
        {
          number: { type: Number },
          unavailableDates: { type: [Date] },
        },
      ],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

/* Ví dụ cho roomNumbers:
const roomNumbers = [
    {
        number: 101,
        unavailableDates: [01.02.2022, 02.02.2022]
    },
    {
        number: 102,
        unavailableDates: [03.04.2022, 04.04.2022]
    },
    {
        number: 103,
        unavailableDates: [02.03.2022, 06.03.2022]
    },
    {
        number: 104,
        unavailableDates: [04.06.2022, 08.06.2022]
    }
]
*/

const RoomModel = mongoose.model("Room", RoomSchema);
export default RoomModel;
