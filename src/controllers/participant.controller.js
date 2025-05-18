const Participant = require("../models/Participant.js");

const getLanguageField = (lang, type) => {
  const fields = {
    fullName: { uz: "fullNameUz", ru: "fullNameRu", en: "fullNameEn" },
    position: { uz: "positionUz", ru: "positionRu", en: "positionEn" },
    description: {
      uz: "descriptionUz",
      ru: "descriptionRu",
      en: "descriptionEn",
    },
  };
  return fields[type]?.[lang];
};

const formatParticipant = (participant, lang) => {
  const fullNameField = getLanguageField(lang, "fullName");
  const positionField = getLanguageField(lang, "position");
  const descriptionField = getLanguageField(lang, "description");
  return {
    _id: participant._id,
    fullName: participant[fullNameField],
    fullNameUz: participant.fullNameUz,
    fullNameRu: participant.fullNameRu,
    fullNameEn: participant.fullNameEn,
    description: participant[descriptionField],
    descriptionEn: participant.descriptionEn,
    descriptionRu: participant.descriptionRu,
    descriptionUz: participant.descriptionUz,
    position: participant[positionField],
    positionEn: participant.positionEn,
    positionRu: participant.positionRu,
    positionUz: participant.positionUz,
    role: participant.role,
    photoUrl: participant.photoUrl,
    createdAt: participant.createdAt,
  };
};

exports.getAllParticipants = async (req, res) => {
  try {
    const { lang } = req.query;
    const participants = await Participant.find();
    const result = participants.map((participant) =>
      formatParticipant(participant, lang)
    );
    return res.json({ data: result.reverse() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }
    return res.json({ data: formatParticipant(participant, req.query.lang) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createParticipant = async (req, res) => {
  try {
    const newParticipant = new Participant(req.body);
    await newParticipant.save();
    return res.status(201).json({ data: newParticipant });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }
    return res.status(200).json({ data: participant });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndDelete(req.params.id);
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }
    return res.json({ message: "Participant deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
