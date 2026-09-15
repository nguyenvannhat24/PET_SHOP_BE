const Vaccination = require('../models/Vaccination');
const Pet = require('../models/Pet');

exports.addVaccine = async (creatorId, creatorRole, data) => {
  const { pet_id } = data;
  
  const pet = await Pet.findById(pet_id);
  if (!pet) throw new Error('Thú cưng không tồn tại.');

  const vaccineData = { ...data };
  
  if (creatorRole === 'VETERINARIAN') {
    vaccineData.veterinarian_id = creatorId;
  } else if (creatorRole === 'CLINIC') {
    vaccineData.clinic_id = creatorId;
  }

  const newVaccine = new Vaccination(vaccineData);
  return await newVaccine.save();
};

exports.getVaccinesByPet = async (petId, userId, userRole) => {
  if (userRole === 'PET_OWNER') {
    const pet = await Pet.findOne({ _id: petId, owner_id: userId });
    if (!pet) throw new Error('Bạn không có quyền xem sổ tiêm chủng của thú cưng này.');
  }

  return await Vaccination.find({ pet_id: petId })
    .populate('veterinarian_id', 'full_name')
    .populate('clinic_id', 'name')
    .sort({ next_due_date: 1 }); // Sort để xem mũi nào sắp đến hạn tiêm nhất
};
