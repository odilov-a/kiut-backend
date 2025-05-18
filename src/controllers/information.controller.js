const Information = require("../models/Information.js");

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

const formatInformation = (information, lang) => {
  const titleField = getLanguageField(lang, "title");
  const descriptionField = getLanguageField(lang, "description");
  return {
    _id: information._id,
    title: information[titleField],
    titleEn: information.titleEn,
    titleRu: information.titleRu,
    titleUz: information.titleUz,
    description: information[descriptionField],
    descriptionEn: information.descriptionEn,
    descriptionRu: information.descriptionRu,
    descriptionUz: information.descriptionUz,
    createdAt: information.createdAt,
  };
};

exports.getAllInformations = async (req, res) => {
  try {
    const { lang } = req.query;
    const informations = await Information.find();
    const result = informations.map((information) =>
      formatInformation(information, lang)
    );
    return res.json({ data: result.reverse() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getInformationById = async (req, res) => {
  try {
    const information = await Information.findById(req.params.id);
    if (!information) {
      return res.status(404).json({ message: "Information not found" });
    }
    return res.json({ data: formatInformation(information, req.query.lang) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createInformation = async (req, res) => {
  try {
    const newInformation = new Information(req.body);
    await newInformation.save();
    return res.status(201).json({ data: newInformation });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateInformation = async (req, res) => {
  try {
    const information = await Information.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!information) {
      return res.status(404).json({ message: "Information not found" });
    }
    return res.status(200).json({ data: information });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteInformation = async (req, res) => {
  try {
    const information = await Information.findByIdAndDelete(req.params.id);
    if (!information) {
      return res.status(404).json({ message: "Information not found" });
    }
    return res.json({ message: "Information deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
