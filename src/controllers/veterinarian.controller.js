const vetService = require('../services/veterinarian.service');

exports.getVeterinarians = async (req, res) => {
  try {
    const vets = await vetService.getVeterinarians(req.query);
    res.status(200).json({ success: true, count: vets.length, data: vets });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};

exports.getVeterinarian = async (req, res) => {
  try {
    const vet = await vetService.getVeterinarianById(req.params.id);
    res.status(200).json({ success: true, data: vet });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const vet = await vetService.createProfile(req.user._id, req.body);
    res.status(201).json({ success: true, data: vet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const vet = await vetService.updateProfile(req.user._id, req.body);
    res.status(200).json({ success: true, data: vet });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};
