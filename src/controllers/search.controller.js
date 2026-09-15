const Clinic = require('../models/Clinic');
const Veterinarian = require('../models/Veterinarian');
const ServiceModel = require('../models/Service');

exports.search = async (req, res) => {
  try {
    const { q, type, species } = req.query;
    let results = {};

    // Xây dựng query cơ bản cho text search
    let textQuery = {};
    if (q) {
      textQuery = { $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]};
    }

    // Tùy theo type (hoặc không truyền type thì tìm cả 3)
    if (!type || type === 'clinic') {
      results.clinics = await Clinic.find(textQuery).limit(10);
    }
    
    if (!type || type === 'veterinarian') {
      let vetQuery = {};
      if (q) {
        vetQuery = { $or: [
          { specialization: { $regex: q, $options: 'i' } },
          { bio: { $regex: q, $options: 'i' } }
        ]};
      }
      results.veterinarians = await Veterinarian.find(vetQuery).populate('user_id', 'full_name').limit(10);
    }

    if (!type || type === 'service') {
      let srvQuery = { ...textQuery };
      if (species) {
        srvQuery.species = { $regex: species, $options: 'i' };
      }
      results.services = await ServiceModel.find(srvQuery).populate('clinic_id', 'name address').limit(20);
    }

    res.status(200).json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('Lỗi tìm kiếm:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};
