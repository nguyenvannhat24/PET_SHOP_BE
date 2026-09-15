const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth.routes');
const petRoutes = require('./routes/pet.routes');
const clinicRoutes = require('./routes/clinic.routes');
const vetRoutes = require('./routes/veterinarian.routes');
const serviceRoutes = require('./routes/service.routes');
const searchRoutes = require('./routes/search.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const recordRoutes = require('./routes/medicalRecord.routes');
const vaccineRoutes = require('./routes/vaccination.routes');
const reviewRoutes = require('./routes/review.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

// Basic route
app.get('/', (req, res) => {
  res.send('PET CONNECT API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/veterinarians', vetRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', recordRoutes);
app.use('/api/vaccinations', vaccineRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;
