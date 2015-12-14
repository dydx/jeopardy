var schemaBuilder = lf.schema.create('jeopardy', 1)

// Our categories
schemaBuilder.createTable('categories')
  .addColumn('id', lf.Type.INTEGER)
  .addColumn('name', lf.Type.STRING)
  .addPrimaryKey(['id'], true)

//schemaBuilder.createTable('questions')
//  .addColumn('id', lf.Type.INTEGER)
//  .addColumn('value', lf.Type.INTEGER)
//  .addColumn('text', lf.Type.STRING)
//  .addColumn('correct', lf.Type.STRING)
//  .addPrimaryKey(['id'], true)

//schemaBuilder.createTable('questions_to_categories')
//  .addColumn('id', lf.Type.INTEGER)
//  .addColumn('cat_id', lf.Type.INTEGER)
//  .addColumn('que_id', lf.Type.INTEGER)
//  .addPrimaryKey(['id'], true)

var jeopardyDb
var category
var question

schemaBuilder.connect().then(function (db) {
  jeopardyDb = db
  category = db.getSchema().table('categories')

  var row1 = category.createRow({
    'name': 'Addition'
  })
  var row2 = category.createRow({
    'name': 'Subtraction'
  })
  var row3 = category.createRow({
    'name': 'Multiplication'
  })
  var row4 = category.createRow({
    'name': 'Division'
  })

  return db.insertOrReplace().into(category).values([row1, row2, row3, row4]).exec()
}).then(function () {
  return jeopardyDb.select().from(category).exec()
}).then(function (results) {
  results.forEach(function (row) {
    console.log(row['id'], row['name'])
  })
})

schemaBuilder.connect().then(function (db) {
})


