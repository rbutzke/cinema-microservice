//index.test.js
require("dotenv-safe").config('./.env'); 
require("./config/mongodb.test").runTests();
require("./repository/repository.test").runTests()
require("./server/server.test").runTests()
require("./api/movies.test").runTests()