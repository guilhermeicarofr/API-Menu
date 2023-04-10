import express from 'express';
import cors from 'cors';

import { testRouter } from 'routes/test-router';
import { authRouter } from 'routes/auth-router';
import { categoryRouter } from 'routes/category-router';
import { productRouter } from 'routes/product-router';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(testRouter);
app.use(authRouter);
app.use(categoryRouter);
app.use(productRouter);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}...`);
});

export { app };
