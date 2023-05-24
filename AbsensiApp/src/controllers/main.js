const db = require("../models");
const sequelize = require("sequelize");
const moment = require("moment");

const mainController = {
	getAll: async (req, res) => {
		try {
			const main = await db.AttendanceLogs.findAll();
			return res.send(main);
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		try {
			const mains = await db.AttendanceLogs.findAll({
				where: {
					user_id: req.params.id,
				},
			});
			return res.send(mains);
		} catch {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	insertClockIn: async (req, res) => {
		const { user_id } = req.params;
		try {
			await db.AttendanceLogs.create({
				clockIn: moment().format("hh:mm"),
				user_id,
			});

			return res.send({
				data: "ok",
				message: "Clock in succesfully",
			});
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	insertClockOut: async (req, res) => {
		const { user_id } = req.params;
		try {
			await db.AttendanceLogs.update(
				{ clockOut: moment().format("hh:mm") },
				{
					where: {
						id: user_id,
					},
				}
			);
			return res.send({
				message: "Clock out successfully",
			});
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = mainController;
