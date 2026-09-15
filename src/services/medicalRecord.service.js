const MedicalRecord = require('../models/MedicalRecord');
const Pet = require('../models/Pet');
const Appointment = require('../models/Appointment');

// Bác sĩ / Phòng khám tạo hồ sơ bệnh án
exports.createRecord = async (creatorId, creatorRole, data) => {
  const { pet_id, appointment_id } = data;

  // Kiểm tra thú cưng tồn tại
  const pet = await Pet.findById(pet_id);
  if (!pet) throw new Error('Thú cưng không tồn tại.');

  // Nếu có truyền appointment_id, xác nhận trạng thái
  if (appointment_id) {
    const appt = await Appointment.findById(appointment_id);
    if (!appt) throw new Error('Lịch hẹn không hợp lệ.');
  }

  // Tự động gán ID của người tạo vào record
  const recordData = {
    ...data,
  };
  
  if (creatorRole === 'VETERINARIAN') {
    recordData.veterinarian_id = creatorId; // Cần map logic tìm vet profile nếu cần
  } else if (creatorRole === 'CLINIC') {
    recordData.clinic_id = creatorId; // Cần map logic tìm clinic nếu cần
  }

  const newRecord = new MedicalRecord(recordData);
  return await newRecord.save();
};

// Pet Owner xem danh sách bệnh án của pet nhà mình
exports.getRecordsByPet = async (petId, userId, userRole) => {
  // Nếu là chủ pet thì phải kiểm tra xem pet có thuộc quyền không
  if (userRole === 'PET_OWNER') {
    const pet = await Pet.findOne({ _id: petId, owner_id: userId });
    if (!pet) throw new Error('Bạn không có quyền xem hồ sơ bệnh án của thú cưng này.');
  }

  return await MedicalRecord.find({ pet_id: petId })
    .populate('veterinarian_id', 'full_name')
    .populate('clinic_id', 'name')
    .sort({ visit_date: -1 });
};

// Lấy chi tiết một bệnh án
exports.getRecordById = async (recordId, userId, userRole) => {
  const record = await MedicalRecord.findById(recordId)
    .populate('pet_id', 'name species owner_id')
    .populate('veterinarian_id', 'full_name')
    .populate('clinic_id', 'name');

  if (!record) throw new Error('Bệnh án không tồn tại.');

  // Nếu là PET_OWNER thì check xem pet này có phải của họ không
  if (userRole === 'PET_OWNER') {
    if (record.pet_id.owner_id.toString() !== userId.toString()) {
      throw new Error('Bạn không có quyền truy cập bệnh án này.');
    }
  }

  return record;
};
