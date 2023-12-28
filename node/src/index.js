const express = require("express");
const { database } = require('./database')

async function createApp() {
	const app = express();
   console.log('Creating db...')
	const sqlTable = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;

	await database.query(sqlTable)

   console.log('Table created...')

	const peoples = [['Guilherme Palma'], ['John Doe'], ['Fulano de tal'], ['Fullcycle']]
	const sqlInsert = `INSERT INTO people(name) VALUES ?`;

	await database.queryMultiple(sqlInsert, peoples)

	app.get("/", async (req, res) => {
		const selectPeoples = `SELECT * FROM people`
		const allPeoples = await database.query(selectPeoples)

		const html = `<h1>Full Cycle Rocks!</h1>\n
  <ul>
    ${allPeoples.map((people) => `<li>${people.name}</li>`).join("")}
  </ul>`;

		res.send(html);
	});
	return app;
}

module.exports = createApp;
