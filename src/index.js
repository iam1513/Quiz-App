const express = require("express");
const { ServerConfig, DatabaseConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT ${ServerConfig.PORT}`);
  await DatabaseConfig.connect();
  console.log("Successfully connected to Database");

  // const UserRepository = require("./repositories/user-repository");
  // const user = new UserRepository();

  // try {
  //   const response = await user.get({
  //     _id: "65eddd1a8700852eae148d6f",
  //   });

  //   console.log(response);
  // } catch (error) {
  //   console.error("Error while creating user:", error);
  // }
});
