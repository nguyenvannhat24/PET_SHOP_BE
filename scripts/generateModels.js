const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '../src/models');

if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const models = {
  User: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  phone: { type: String, required: true },
  avatar_url: { type: String },
  role: { type: String, enum: ['PET_OWNER', 'VETERINARIAN', 'CLINIC', 'ADMIN'], default: 'PET_OWNER' },
  status: { type: String, enum: ['ACTIVE', 'BLOCKED', 'INACTIVE'], default: 'ACTIVE' },
  email_verified: { type: Boolean, default: false },
  phone_verified: { type: Boolean, default: false },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('User', UserSchema);
`,

  Pet: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const PetSchema = new Schema({
  owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  gender: { type: String, enum: ['MALE', 'FEMALE', 'UNKNOWN'], default: 'UNKNOWN' },
  date_of_birth: { type: Date },
  weight: { type: Number },
  color: { type: String },
  avatar_url: { type: String },
  is_neutered: { type: Boolean, default: false },
  allergies: { type: String },
  chronic_conditions: { type: String },
  notes: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Pet', PetSchema);
`,

  MedicalRecord: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const MedicalRecordSchema = new Schema({
  pet_id: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  veterinarian_id: { type: Schema.Types.ObjectId, ref: 'Veterinarian' },
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic' },
  appointment_id: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  diagnosis: { type: String, required: true },
  symptoms: { type: String },
  treatment: { type: String },
  prescription: { type: String },
  notes: { type: String },
  attachment_url: { type: String },
  record_date: { type: Date, default: Date.now }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
`,

  Vaccination: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const VaccinationSchema = new Schema({
  pet_id: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  vaccine_name: { type: String, required: true },
  vaccination_date: { type: Date, required: true },
  next_due_date: { type: Date },
  veterinarian_id: { type: Schema.Types.ObjectId, ref: 'Veterinarian' },
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic' },
  batch_number: { type: String },
  notes: { type: String },
  reminder_enabled: { type: Boolean, default: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Vaccination', VaccinationSchema);
`,

  Clinic: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClinicSchema = new Schema({
  owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['VETERINARY_CLINIC', 'PET_SHOP', 'PET_HOSPITAL', 'PET_SPA', 'PET_HOTEL'], required: true },
  description: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  logo_url: { type: String },
  cover_url: { type: String },
  opening_time: { type: String },
  closing_time: { type: String },
  status: { type: String, default: 'ACTIVE' },
  average_rating: { type: Number, default: 0 },
  total_reviews: { type: Number, default: 0 },
  is_verified: { type: Boolean, default: false }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Clinic', ClinicSchema);
`,

  Veterinarian: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const VeterinarianSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  license_number: { type: String },
  specialization: { type: String },
  experience_years: { type: Number },
  education: { type: String },
  bio: { type: String },
  avatar_url: { type: String },
  average_rating: { type: Number, default: 0 },
  total_reviews: { type: Number, default: 0 },
  is_verified: { type: Boolean, default: false }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Veterinarian', VeterinarianSchema);
`,

  ClinicVeterinarian: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClinicVeterinarianSchema = new Schema({
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  veterinarian_id: { type: Schema.Types.ObjectId, ref: 'Veterinarian', required: true },
  position: { type: String },
  joined_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('ClinicVeterinarian', ClinicVeterinarianSchema);
`,

  Service: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema({
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'ServiceCategory' },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration_minutes: { type: Number },
  species: { type: String },
  status: { type: String, default: 'ACTIVE' },
  image_url: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Service', ServiceSchema);
`,

  ServiceCategory: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceCategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);
`,

  Product: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, default: 0 },
  image_url: { type: String },
  brand: { type: String },
  species: { type: String },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Product', ProductSchema);
`,

  ProductCategory: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductCategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image_url: { type: String },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
`,

  Appointment: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pet_id: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  veterinarian_id: { type: Schema.Types.ObjectId, ref: 'Veterinarian' },
  service_id: { type: Schema.Types.ObjectId, ref: 'Service' },
  appointment_date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String },
  reason: { type: String },
  symptoms: { type: String },
  notes: { type: String },
  status: { type: String, enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED', 'NO_SHOW'], default: 'PENDING' },
  cancellation_reason: { type: String },
  completed_at: { type: Date }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
`,

  Review: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  appointment_id: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true, unique: true },
  owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  veterinarian_id: { type: Schema.Types.ObjectId, ref: 'Veterinarian' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  images: [{ type: String }],
  response: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Review', ReviewSchema);
`,

  Conversation: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  appointment_id: { type: Schema.Types.ObjectId, ref: 'Appointment' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
`,

  ConversationMember: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConversationMemberSchema = new Schema({
  conversation_id: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  joined_at: { type: Date, default: Date.now },
  last_read_at: { type: Date }
});

module.exports = mongoose.model('ConversationMember', ConversationMemberSchema);
`,

  Message: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  conversation_id: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message_type: { type: String, enum: ['TEXT', 'IMAGE', 'VIDEO', 'FILE'], default: 'TEXT' },
  content: { type: String },
  file_url: { type: String },
  is_read: { type: Boolean, default: false }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Message', MessageSchema);
`,

  Notification: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  reference_id: { type: Schema.Types.ObjectId },
  reference_type: { type: String },
  is_read: { type: Boolean, default: false },
  read_at: { type: Date }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('Notification', NotificationSchema);
`,

  PointWallet: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointWalletSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, default: 0 },
  total_earned: { type: Number, default: 0 },
  total_spent: { type: Number, default: 0 }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('PointWallet', PointWalletSchema);
`,

  PointTransaction: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointTransactionSchema = new Schema({
  wallet_id: { type: Schema.Types.ObjectId, ref: 'PointWallet', required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  balance_after: { type: Number, required: true },
  reference_type: { type: String },
  reference_id: { type: Schema.Types.ObjectId },
  description: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('PointTransaction', PointTransactionSchema);
`,

  VIPPlan: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const VIPPlanSchema = new Schema({
  name: { type: String, required: true },
  duration_days: { type: Number, required: true },
  price: { type: Number, required: true },
  max_pets: { type: Number, required: true },
  ad_free: { type: Boolean, default: false },
  benefits: { type: String },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('VIPPlan', VIPPlanSchema);
`,

  VIPSubscription: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const VIPSubscriptionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan_id: { type: Schema.Types.ObjectId, ref: 'VIPPlan', required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: 'ACTIVE' },
  payment_id: { type: Schema.Types.ObjectId, ref: 'Payment' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('VIPSubscription', VIPSubscriptionSchema);
`,

  Voucher: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const VoucherSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  discount_type: { type: String, required: true },
  discount_value: { type: Number, required: true },
  min_order_value: { type: Number },
  max_discount: { type: Number },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  used_quantity: { type: Number, default: 0 },
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic' },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Voucher', VoucherSchema);
`,

  AdvertisementPackage: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdvertisementPackageSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration_days: { type: Number, required: true },
  priority_level: { type: Number, default: 0 },
  max_impressions: { type: Number },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('AdvertisementPackage', AdvertisementPackageSchema);
`,

  Advertisement: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdvertisementSchema = new Schema({
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  package_id: { type: Schema.Types.ObjectId, ref: 'AdvertisementPackage', required: true },
  title: { type: String, required: true },
  image_url: { type: String, required: true },
  target_url: { type: String },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  budget: { type: Number },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
`,

  Symptom: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const SymptomSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  species: { type: String },
  severity: { type: String },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Symptom', SymptomSchema);
`,

  ClinicSymptom: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClinicSymptomSchema = new Schema({
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  symptom_id: { type: Schema.Types.ObjectId, ref: 'Symptom', required: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('ClinicSymptom', ClinicSymptomSchema);
`,

  Favorite: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  target_type: { type: String, enum: ['CLINIC', 'VETERINARIAN', 'SERVICE', 'PRODUCT'], required: true },
  target_id: { type: Schema.Types.ObjectId, required: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
`,

  Payment: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  payment_method: { type: String, required: true },
  transaction_code: { type: String },
  reference_type: { type: String },
  reference_id: { type: Schema.Types.ObjectId },
  status: { type: String, default: 'PENDING' },
  paid_at: { type: Date }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Payment', PaymentSchema);
`,

  Report: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportSchema = new Schema({
  reporter_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  target_type: { type: String, required: true },
  target_id: { type: Schema.Types.ObjectId, required: true },
  reason: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'PENDING' },
  admin_note: { type: String },
  resolved_at: { type: Date }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('Report', ReportSchema);
`,

  AuditLog: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuditLogSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  entity_type: { type: String, required: true },
  entity_id: { type: Schema.Types.ObjectId },
  old_data: { type: Schema.Types.Mixed },
  new_data: { type: Schema.Types.Mixed },
  ip_address: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
`
};

Object.entries(models).forEach(([modelName, content]) => {
  fs.writeFileSync(path.join(modelsDir, modelName + '.js'), content);
  console.log('Generated ' + modelName + '.js');
});
