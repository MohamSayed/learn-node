var express = require('express'), url = require('url');
var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
};


var app = express()
// NOTE: Hardcoded
app.get('/*', function (req, res) {
    // Get the last element from the request's url
    // http://localhost:3000/hello
    var _query = url.parse(req.url).pathname.split('/').slice(-1)[0] // = hello
    console.log(_query);
    graphql(schema, '{' + _query + '}', root)
        .then((response) => {
            console.log(response);
            res.send(response.data);
        });
})

app.listen(3000);