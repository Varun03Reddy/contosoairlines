const mongoose = require('mongoose');
const UserInfoModelSchema = require('./book.repository.model');

class BookFlightsRepository {
    constructor(options) {
        // Expecting mongo_url and database_name instead of CosmosDB credentials
        let { mongo_url, database_name } = options;
        
        mongo_url = mongo_url || 'mongodb://localhost:27017'; // Local MongoDB default
        database_name = database_name || 'contosoair';        // Default DB name

        const connectionString = `${mongo_url}/${database_name}`;

        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.Promise = global.Promise;
    }

    async getUserInfo(username) {
        const UserInfoModel = mongoose.model('UserInfoModel', UserInfoModelSchema);
        const result = await UserInfoModel.findOne({ user: username }).lean().exec();
        return result || { user: username, booked: null, purchased: [] };
    }

    async createOrUpdateUserInfo(userInfo) {
        const UserInfoModel = mongoose.model('UserInfoModel', UserInfoModelSchema);
        await UserInfoModel.findOneAndUpdate({ user: userInfo.user }, userInfo, { upsert: true });
    }
}

module.exports = BookFlightsRepository;
