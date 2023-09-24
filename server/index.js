import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import paymentRoutes from "./routes/payment.js";
import subscribeRoutes from "./routes/subscribe.js";
import userInfoRoutes from "./routes/userInfo.js";
import translationRoutes from "./routes/translation.js";
import dotenv from 'dotenv';

const allowedOrigins = ['http://localhost:3000'];
const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limmit: "30mb", extended: true }));
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

app.set("trust proxy", true);

app.get('/', async (req, res) => {

    res.send("Stackoverflow")
})

app.use("/user", userRoutes)
app.use("/questions", questionRoutes)
app.use("/answer", answerRoutes)
app.use("/payment", paymentRoutes);
app.use("/subscription", subscribeRoutes);
app.use("/userInfo", userInfoRoutes);
app.use("/translation", translationRoutes);



const PORT = process.env.PORT || 5000;



// The above code will make static local mongoDB storage, but we dont want to do it that way. so, we will use atlas

const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`server running on port ${PORT}`) }))
    .catch((err) => console.log(err.message))
