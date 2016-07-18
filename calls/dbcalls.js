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
  },
  months: function(){
    return knex.raw("select * from month order by id");
  },
  usermonthpayments: function(user){
    return knex.raw(`select paymentsdue.id, users.name as user_name, month.month as month, bills.name as bill, paymentsdue.amount, paymentsdue.status from paymentsdue join month on month.id = paymentsdue.month_id join bills on bills.id = paymentsdue.bill_id join users on users.id = paymentsdue.user_id where users.name='${user}'`);
  },
  updatestatus: function(id, status){
    return knex.raw( `update paymentsdue set status=${status} where id=${id}`)
  }
};
