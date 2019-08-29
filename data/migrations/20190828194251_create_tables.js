
exports.up = function(knex) {
  return knex.schema.createTable('zoos', tbl => {
    tbl.increments()
    tbl.string('zoo_name', 128).notNullable()
    tbl.string('address',128).notNullable().unique()
  })
  .createTable('species', tbl => {
    tbl.increments()
    tbl.string('species_name', 128).notNullable().unique()
  })
  .createTable('animals', tbl => {
    tbl.increments()
    tbl.string('animal_name', 128).notNullable()
    //*************FOREIGN KEY ****************
    tbl.integer('species_id')
      .unsigned() // Keeps integer a Positive
      .notNullable()
      .references('id')
      .inTable('species') // MUST EXIST FOR FOREIGN KEY
      .onDelete('CASCADE')
      .onUpdate('CASCADE')// Deletes/Updates in all related tables.
  })
  .createTable('zoo_animals', tbl => {
    tbl.integer('zoo_id')
      .unsigned() // Keeps integer a Positive
      .notNullable()
      .references('id')
      .inTable('zoos') // MUST EXIST FOR FOREIGN KEY
      .onDelete('CASCADE')
      .onUpdate('CASCADE')// Deletes/Updates in all related tables.
    tbl.integer('animal_id')
      .unsigned() // Keeps integer a Positive
      .notNullable()
      .references('id')
      .inTable('animals') // MUST EXIST FOR FOREIGN KEY
      .onDelete('CASCADE')
      .onUpdate('CASCADE')// Deletes/Updates in all related tables.
    tbl.primary('zoo_id', 'animal_id')// Makes these two fields combined, the primary key.
  })
};

exports.down = function(knex) {
  //Reverse the order of creation
  return knex.schema
    .dropTableIfExists('zoo_animals')
    .dropTableIfExists('animals')
    .dropTableIfExists('species')
    .dropTableIfExists('zoos')
};
