import express from 'express';
import { createServer } from 'http';
import fileUpload from 'express-fileupload';
import { Server } from 'socket.io';
import path from 'path';

import userRouter from './router/user.router.js';
import messageRouter from './router/post.router.js';
import swaggerRouter from './swagger.js';






const app = express();
app.use(express.json());
app.use(fileUpload());

app.use( userRouter );
app.use( messageRouter );

app.use( express.static(path.resolve('uploads')));




app.use('/api-docs', swaggerRouter )


app.listen(3000, () => console.log(`server ready at *3000`))