const mongoose = require('mongoose');
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
