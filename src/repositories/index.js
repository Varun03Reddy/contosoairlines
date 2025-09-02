const airportsJSON = require('../data/airports');
const destinationsJSON = require('../data/destinations');
const dealsJSON = require('../data/deals');
const flightsJSON = require('../data/flights');
const _BookRepository = require('./book.repository');
const _FlightsRepository = require('./flights.repository');

let bookRepository = null;

const AirportsRepository = () => airportsJSON;
const DestinationsRepository = () => destinationsJSON;
const DealsRepository = () => dealsJSON;

const BookRepository = () => {
    if (!bookRepository) {
        // Use MongoDB environment variables instead of CosmosDB
        const mongo_url = process.env.MONGO_URL || 'mongodb://localhost:27017';
        const database_name = process.env.MONGO_DB_NAME || 'contosoair';
        bookRepository = new _BookRepository({ mongo_url, database_name });
    }
    return bookRepository;
};

const FlightsRepository = () => new _FlightsRepository(flightsJSON);

module.exports = {
    AirportsRepository,
    DestinationsRepository,
    DealsRepository,
    BookRepository,
    FlightsRepository
};

