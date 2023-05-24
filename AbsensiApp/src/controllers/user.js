const db = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const moment = require("moment");
const privateKey = process.env.private_key;
const url_image = process.env.URL_IMAGE;
const userController = {
	getAll: async (req, res) => {
		try {
			const user = await db.User.findAll();

			return res.send(user);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		const user = await db.User.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.send(user);
	},
	register: async (req, res) => {
		try {
			console.log(req.query);
			const user = await db.User.findOne({
				where: { email: req.query.email },
			});

			console.log(user);

			return res.send(user);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	login: async (req, res) => {
		try {
			console.log(req.query);

			const user = await db.User.findOne({
				where: {
					email: req.query.email,
				},
			});
			if (user) {
				const match = await bcrypt.compare(
					req.query.password,
					user.dataValues.password
				);
				if (match) {
					console.log(match);
					const token = jwt.sign(user.dataValues, privateKey, {
						expiresIn: "1h",
					});

					return res.send({
						user,
						token,
					});
				} else {
					throw new Error("password salah");
				}
			} else {
				throw new Error("user not");
			}
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	loginv2: async (req, res) => {
		try {
			console.log(req.query);

			const user = await db.User.findOne({
				where: {
					email: req.query.email,
				},
			});
			if (user) {
				const match = await bcrypt.compare(
					req.query.password,
					user.dataValues.password
				);
				if (user) {
					const payload = {
						id: user.dataValues.id,
					};
					const token = await db.Token.create({
						expired: moment().add(1, "days").format(),
						token: nanoid(),
						payload: JSON.stringify(payload),
					});
					console.log(token);
					return res.send({
						token: token.dataValues.token,
					});
				} else {
					throw new Error("password salah");
				}
				console.log(match);
			} else {
				throw new Error("user not");
			}
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},

	getByToken: async (req, res) => {
		const { token } = req.query;
		console.log(token);
		let user = jwt.verify(token, privateKey);
		user = await db.User.findOne({
			where: {
				id: user.id,
			},
		});
		res.send(user);
	},
	getByTokenV2: async (req, res) => {
		try {
			console.log(db.sequelize);
			const { token } = req.query;
			let p = await db.Token.findOne({
				where: {
					token,
					expired: {
						[db.Sequelize.Op.gt]: [moment().format()],
						[db.Sequelize.Op.lte]: [moment().add(1, "days").format()],
					},
				},
			});
			if (!p) {
				throw new Error("token has expired");
			}
			user = await db.User.findOne({
				where: {
					id: JSON.parse(p.dataValues.payload).id,
				},
			});
			req.user = user;
			next();
		} catch (err) {
			return res.status(500).send(err.message);
		}
	},
	insertUserV1: async (req, res, next) => {
		try {
			const { fullname, username, address, email, password, company_id } =
				req.body;
			const hashPassword = await bcrypt.hash(password, 10);
			console.log(hashPassword);
			const result = await db.sequelize.transaction(async () => {
				const newUser = await db.User.create({
					fullname,
					username,
					address,
					email,
					password: hashPassword,
					company_id,
				});
				console.log(newUser.dataValues);
			});
			return res.send(hashPassword);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getTokenByEmail: async (req, res, next) => {
		try {
			console.log(req.query);
			const user = await db.User.findOne({
				where: {
					email: req.query.email,
				},
			});
			if (user) {
				const payload = {
					id: user.dataValues.id,
				};
				const token = await db.Token.create({
					expired: moment().add(1, "days").format(),
					token: nanoid(),
					payload: JSON.stringify(payload),
				});
				console.log(token);
				return res.send({
					url:
						"http://localhost:3000/forgot-password/" + token.dataValues.token,
				});
			} else {
				throw new Error("Email tidak ketemu");
			}
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	changePassword: async (req, res) => {
		try {
			console.log(req.query);
			const user = await db.User.findOne({
				where: {
					email: req.query.email,
				},
			});
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	uploadAvatar: async (req, res) => {
		const { filename } = req.file;

		await db.User.update(
			{
				avatar_url: url_image + filename,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);

		await db.User.findOne({
			where: {
				id: req.params.id,
			},
		}).then((result) => res.send(result));
	},
};
module.exports = userController;
