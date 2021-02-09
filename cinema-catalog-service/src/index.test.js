//index.test.js

require("dotenv-safe").config('./.env'); 
require("./config/mongodb.test").runTests();
require("./server/server.test").runTests();
require("./repository/repository.test").runTests();
require("./api/cinema-catalog.test").runTests();
