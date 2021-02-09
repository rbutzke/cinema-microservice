const test = require("tape");
const mongodb = require("./mongodb");

function runTests(){

    //unit tests
    test("MongoDB Connect", (t) => {
       mongodb.connect((err,db)=>{
           t.assert(!err && db, "Connection Succeed");
           t.end();
       })
    })

    test("MongoDB Disconnect", (t) => {
        t.assert(mongodb.disconnect(), "Disconnected successfully");
        t.end();
    })
}

module.exports = { runTests }