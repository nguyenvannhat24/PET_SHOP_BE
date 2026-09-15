const recordService = require('../services/medicalRecord.service');

exports.createRecord = async (req, res) => {
  try {
    const creatorId = req.user._id;
    const creatorRole = req.user.role;
    
    const record = await recordService.createRecord(creatorId, creatorRole, req.body);
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getPetRecords = async (req, res) => {
  try {
    const records = await recordService.getRecordsByPet(req.params.petId, req.user._id, req.user.role);
    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

exports.getRecordDetails = async (req, res) => {
  try {
    const record = await recordService.getRecordById(req.params.id, req.user._id, req.user.role);
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};
