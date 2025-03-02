module.exports.createLookupTable = function (tbl) {
  tbl.increments('id');
  tbl.string('label', 32).notNullable().unique();
};
