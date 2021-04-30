let EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
	name: "Task",
	tableName: "tasks",
	columns : {
		id: {
			primary: true,
			type: "int",
			generated: true
		},
		text: {
			type: "varchar"
		},
	},
	relations: {
		tags: {
			target: "Tag",
			type: "many-to-many",
			joinTable: true,
			cascade: true
		}
	}
});
