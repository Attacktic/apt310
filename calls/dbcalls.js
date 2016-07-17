var knex = require('../db/knex.js');

module.exports = {
  usersdb: function(){
    return knex.raw("select * from users");
  },
  users: function(results){
    var allusers = [];
    for (var i in results){
      allusers.push(results[i].name);
    }
    return allusers;
  },
  capFirst: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
