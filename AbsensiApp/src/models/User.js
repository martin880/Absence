module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("Users", {
		fullname: Sequelize.STRING,
		address: Sequelize.STRING,
		email: Sequelize.STRING,
		password: Sequelize.STRING,
		company_id: Sequelize.INTEGER,
		avatar_url: Sequelize.STRING,
	});
	return User;
};
