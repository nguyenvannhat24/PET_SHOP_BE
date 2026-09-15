const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  appointment_id: { type: Schema.Types.ObjectId, ref: 'Appointment' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
