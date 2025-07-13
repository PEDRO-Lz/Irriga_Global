import express from 'express';
import apiRoutes from './routes/apiRoutes.js';
import { criarAdmin } from './models/AdminCriar.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/', apiRoutes);

criarAdmin();

const PORT =  process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});