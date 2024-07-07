const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')


require('dotenv').config();

const PORT = process.env.PORT || 5000

const connectDb = require('./config/db')

const { notFound, errorHandler } = require('./middleware/errorMiddleware')


// import routes 

const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const interestRoutes = require('./routes/interestRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

// connect to mongodb using mongoose

connectDb();

// middlewares

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/storage/images', express.static('storage/images'))
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/interest',interestRoutes)
app.use('/api/payment',paymentRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'server home page' });
})

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`server is listening at PORT ${PORT}`);
})


// test the change