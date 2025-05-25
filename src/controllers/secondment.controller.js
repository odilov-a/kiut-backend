const Secondment = require("../models/Secondment.js");

const getLanguageField = (lang, type) => {
  const fields = {
    title: { uz: "titleUz", ru: "titleRu", en: "titleEn" },
    description: {
      uz: "descriptionUz",
      ru: "descriptionRu",
      en: "descriptionEn",
    },
  };
  return fields[type]?.[lang];
};

const formatSecondment = (secondment, lang) => {
  const titleField = getLanguageField(lang, "title");
  const descriptionField = getLanguageField(lang, "description");
  return {
    _id: secondment._id,
    title: secondment[titleField],
    titleEn: secondment.titleEn,
    titleRu: secondment.titleRu,
    titleUz: secondment.titleUz,
    description: secondment[descriptionField],
    descriptionEn: secondment.descriptionEn,
    descriptionRu: secondment.descriptionRu,
    descriptionUz: secondment.descriptionUz,
    createdAt: secondment.createdAt,
  };
};

exports.getAllSecondments = async (req, res) => {
  try {
    const { lang } = req.query;
    const secondments = await Secondment.find();
    const result = secondments.map((secondment) =>
      formatSecondment(secondment, lang)
    );
    return res.json({ data: result.reverse() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getSecondmentById = async (req, res) => {
  try {
    const secondment = await Secondment.findById(req.params.id);
    if (!secondment) {
      return res.status(404).json({ message: "Secondment not found" });
    }
    return res.json({ data: formatSecondment(secondment, req.query.lang) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createSecondment = async (req, res) => {
  try {
    const newSecondment = new Secondment(req.body);
    await newSecondment.save();
    return res.status(201).json({ data: newSecondment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateSecondment = async (req, res) => {
  try {
    const secondment = await Secondment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!secondment) {
      return res.status(404).json({ message: "Secondment not found" });
    }
    return res.status(200).json({ data: secondment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteSecondment = async (req, res) => {
  try {
    const secondment = await Secondment.findByIdAndDelete(req.params.id);
    if (!secondment) {
      return res.status(404).json({ message: "Secondment not found" });
    }
    return res.json({ message: "Secondment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
