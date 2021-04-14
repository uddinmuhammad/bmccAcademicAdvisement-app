var mongoose = require('mongoose');

const db = 'mongodb+srv://advismentAdmin:Bmcc1234@cluster0.qqxur.mongodb.net/allMajorCourses?retryWrites=true&w=majority';

const connectDB = async () => {
    try{
        await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Database Connected!");
    }
    catch(err){
        console.error(err.message);
        //Exit process with faliur
        process.exit(1)
    }

}

module.exports = connectDB;