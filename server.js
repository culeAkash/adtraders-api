

const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' });


const app = require('./app');


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    // console.log(con.connections);
    console.log('DB connection successful');
})

app.listen(8000, () => {
    console.log("Server lsitening on port" + 8000);
})