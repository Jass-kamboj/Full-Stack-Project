import express from 'express';
import connectDb from './connect/connectDb.js';
import userRouter from './routes/userRouter.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());

const port = 5100;
connectDb();
app.use("/user",userRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})