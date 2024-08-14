const mongoose = require('mongoose');

const recentCallSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: {
        displayName: { type: String, required: true },
        date: { type: Date, required: true },
        status: { type: String, required: true },
    },
    target: { type: String, required: true }
});

module.exports = mongoose.model('RecentCall', recentCallSchema);
