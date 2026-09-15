const mongoose = require('mongoose');
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
