let EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
	name: "Tag",
	tableName: "tags",
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: true
		},
		name: {
			type: "varchar"
		}
	}
});
