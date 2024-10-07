const mongoose = require('mongoose');


const connectDatabase = () => {
    console.log(process.env.DB_LOCAL_URI)
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log(`MongoDb Database connected with host: ${con.connection.host}`);
    }
        
    )
}

module.exports = connectDatabase