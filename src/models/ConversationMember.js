const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConversationMemberSchema = new Schema({
  conversation_id: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  joined_at: { type: Date, default: Date.now },
  last_read_at: { type: Date }
});

module.exports = mongoose.model('ConversationMember', ConversationMemberSchema);
