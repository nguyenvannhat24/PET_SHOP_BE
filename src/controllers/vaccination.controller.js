const vaccineService = require('../services/vaccination.service');

exports.addVaccine = async (req, res) => {
  try {
    const creatorId = req.user._id;
    const creatorRole = req.user.role;
    
    const vaccine = await vaccineService.addVaccine(creatorId, creatorRole, req.body);
    res.status(201).json({ success: true, data: vaccine });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getPetVaccines = async (req, res) => {
  try {
    const vaccines = await vaccineService.getVaccinesByPet(req.params.petId, req.user._id, req.user.role);
    res.status(200).json({ success: true, count: vaccines.length, data: vaccines });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};
