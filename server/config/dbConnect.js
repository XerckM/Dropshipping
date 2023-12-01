const { default: mongoose } =  require('mongoose');

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        mongoose.connection.once("open", () => {
            console.log("Database successfully connected.");
        })
    } catch (error) {
        console.log("Error connecting to database.");
    }
};
module.exports = dbConnect;