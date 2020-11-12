const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const db2 = process.env.NUEVAMONGO;

const connectDB = async () => {
	try {
		await mongoose.connect(db2, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Conectado...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
