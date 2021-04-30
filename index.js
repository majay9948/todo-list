// Imports
const express = require('express');
const cors = require('cors');
const typeorm = require('typeorm');

// Variables
let server = {
	port: 3000
};

// Configuration
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Initalize TypeORM
typeorm.createConnection()
	.then((connection) => {
		let taskRepo = connection.getRepository("Task");

		// General Routes
		app.get('/ping', async (_req, res) => {
			res.send("pong");
		});

		// Task Routes
		app.get('/tasks', async (_req, res) => {
			let all_tasks = await taskRepo.find();
			res.send(all_tasks);
		});

		app.get('/tasks/:tag', async (req, res) => {
			let tasks = await taskRepo
				.createQueryBuilder("task")
				.leftJoinAndSelect("task.tags", "tag")
				.where('tag.name = :name', { name: req.params.tag })
				.getMany();
			res.send(tasks);
		});

		app.post('/tasks', async (req, res) => {
			let tags_to_be_added = [];
			req.body.tags.split(',').forEach((tagName) => {
				let tag = {
					name: tagName
				};
				tags_to_be_added.push(tag);
			});
			let task_to_be_added = {
				text: req.body.text,
				tags: tags_to_be_added
			};
			taskRepo.save(task_to_be_added);
			res.send("Task has been added!")
		});

	});

// Listener
app.listen(server.port, () => {
	console.log(`App is listening at: https://localhost:${server.port}`);
});
