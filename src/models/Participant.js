const { Schema, model } = require("mongoose");
const roleEnum = ["Project Managers", "Main performers", "Students", "Others"];
const participantSchema = new Schema(
  {
    fullNameUz: {
      type: String,
      required: true,
    },
    fullNameRu: {
      type: String,
      required: true,
    },
    fullNameEn: {
      type: String,
      required: true,
    },
    descriptionUz: {
      type: String,
      required: true,
    },
    descriptionRu: {
      type: String,
      required: true,
    },
    descriptionEn: {
      type: String,
      required: true,
    },
    positionUz: {
      type: String,
      required: true,
    },
    positionRu: {
      type: String,
      required: true,
    },
    positionEn: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: roleEnum,
      required: true,
    },
    photoUrl: [
      {
        type: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Participant = model("Participant", participantSchema);
module.exports = Participant;
