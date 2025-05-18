const Publication = require("../models/Publication.js");

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

const formatPublication = (publication, lang) => {
  const titleField = getLanguageField(lang, "title");
  const descriptionField = getLanguageField(lang, "description");
  return {
    _id: publication._id,
    title: publication[titleField],
    titleEn: publication.titleEn,
    titleRu: publication.titleRu,
    titleUz: publication.titleUz,
    description: publication[descriptionField],
    descriptionEn: publication.descriptionEn,
    descriptionRu: publication.descriptionRu,
    descriptionUz: publication.descriptionUz,
    createdAt: publication.createdAt,
  };
};

exports.getAllPublications = async (req, res) => {
  try {
    const { lang } = req.query;
    const publications = await Publication.find();
    const result = publications.map((publication) =>
      formatPublication(publication, lang)
    );
    return res.json({ data: result.reverse() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    return res.json({ data: formatPublication(publication, req.query.lang) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createPublication = async (req, res) => {
  try {
    const newPublication = new Publication(req.body);
    await newPublication.save();
    return res.status(201).json({ data: newPublication });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    return res.status(200).json({ data: publication });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    return res.json({ message: "Publication deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
