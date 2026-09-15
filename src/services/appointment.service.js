const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const Clinic = require('../models/Clinic');
const ServiceModel = require('../models/Service');
const Veterinarian = require('../models/Veterinarian');

exports.createAppointment = async (ownerId, data) => {
  const { pet_id, clinic_id, service_id, veterinarian_id, appointment_date, start_time } = data;

  // Kiểm tra Pet có thuộc Owner không
  const pet = await Pet.findOne({ _id: pet_id, owner_id: ownerId });
  if (!pet) throw new Error('Thú cưng không tồn tại hoặc không thuộc quyền sở hữu của bạn.');

  // Kiểm tra Clinic tồn tại
  const clinic = await Clinic.findById(clinic_id);
  if (!clinic) throw new Error('Phòng khám không tồn tại.');

  // Lưu lịch hẹn
  const newAppt = new Appointment({
    owner_id: ownerId,
    ...data,
    status: 'PENDING'
  });

  return await newAppt.save();
};

exports.getMyAppointments = async (ownerId) => {
  return await Appointment.find({ owner_id: ownerId })
    .populate('pet_id', 'name species')
    .populate('clinic_id', 'name address')
    .populate('service_id', 'name price')
    .sort({ appointment_date: -1 });
};

exports.updateStatus = async (appointmentId, newStatus, userId, userRole) => {
  const appt = await Appointment.findById(appointmentId);
  if (!appt) throw new Error('Không tìm thấy lịch hẹn.');

  // Người dùng thường (Pet Owner) chỉ được quyền CANCEL lịch của họ
  if (userRole === 'PET_OWNER') {
    if (appt.owner_id.toString() !== userId.toString()) {
      throw new Error('Bạn không có quyền sửa lịch hẹn này.');
    }
    if (newStatus !== 'CANCELLED') {
      throw new Error('Bạn chỉ được phép hủy lịch hẹn.');
    }
  }

  // Clinic được phép duyệt, hoàn thành lịch của họ
  if (userRole === 'CLINIC') {
    const clinic = await Clinic.findOne({ _id: appt.clinic_id, owner_id: userId });
    if (!clinic) throw new Error('Bạn không có quyền sửa lịch hẹn của phòng khám khác.');
  }

  // Cập nhật
  appt.status = newStatus;
  if (newStatus === 'COMPLETED') {
    appt.completed_at = new Date();
  }
  
  await appt.save();
  return appt;
};
