const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
const db = require("./models/");
const routes = require("./routes");
const User = db.User;
const Company = db.Company;
const AttendanceLog = db.AttendanceLogs;

// AttendanceLog.sync();
// User.sync();
// User.sync({ force: true }).then(() => console.log("Sync Complete"));
// db.sequelize.sync({ force: true }).then(() => console.log("Sync Complete"));

app.use("/main", routes.mainRoutes);
app.use("/company", routes.companyRoutes);
app.use("/users", routes.userRoutes);
app.use("/avatar", express.static(`${__dirname}/public/avatar`));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
