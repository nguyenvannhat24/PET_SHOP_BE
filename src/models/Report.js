const mongoose = require('mongoose');
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
