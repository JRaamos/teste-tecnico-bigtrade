import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { MONGO_HOSTNAME, MONGO_PORT, MONGO_DB, MONGO_USERNAME, MONGO_PASSWORD } = process.env;


const mongoURI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

  console.log({ mongoURI });

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro de conexão:', error);
  }
};

export default connectToDatabase;