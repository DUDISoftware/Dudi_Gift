const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
// server.js (hoặc app.js)
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler); // 👈 phải đặt sau tất cả route

console.log("TEST ROUTER TYPE:", typeof express.Router); // ✅ Phải ra "function"

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
})
.catch(err => {
    console.error('❌ Failed to connect to MongoDB', err);
});
