const express = require('express');
const cors = require('cors')
const graphqlHTTP = require('express-graphql');
const { importSchema } = require('graphql-import');

const { buildSchema } = require('graphql');
const axios = require('axios');

const harvardAPIKey = "c28e4be0-4c0e-11ea-90d6-25d9a9fe80fc";
// Construct a schema, using GraphQL schema language

// https://api.harvardartmuseums.org/classification/23

// The root provides a resolver function for each API endpoint
var root = {
    getPrints: async ({ page, itemsPerPage }) => {
        try {
            var prints = (await axios.get(
                `https://api.harvardartmuseums.org/object?apikey=${harvardAPIKey}&classification=Prints&verificationlevel=Best&sort=rank&sortorder=desc&hasimage=1&size=${itemsPerPage}&page=${page}`
            )).data;
        } catch (e) {
            console.log("harvard art museum api error", e);
        }
        console.log("prints", prints);

        const answer = {
            totalPrints: prints.info && prints.info.totalrecords,
            pages: prints.info && prints.info.pages,
            Prints: prints.records,
        }

        return answer;
    },
};

(async () => {
    try {
        const typeDefs = await importSchema('./schema/index.graphql');
        var schemaGQL = buildSchema(typeDefs);
    } catch (e) {
        console.log("error importing graphql schema", e);
    }
    var app = express();
    app.use(cors());
    app.use('/graphql', graphqlHTTP({
        schema: schemaGQL,
        rootValue: root,
        graphiql: true,
    }));
    app.listen(4000);
    console.log('Running a GraphQL API server at http://localhost:4000/graphql');

})();

