const UsersController = require("./usersController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class ValidatorsController extends UsersController {
  constructor(model) {
    super(model);
    this.model = model;
  }

  async registerUser(req, res) {
    const { email, firstName, lastName, hashedPassword } = req.body;
    let user = await this.findUserByEmail(email);

    if (user) return res.send({ message: "User account already exists" });

    try {
      const encryptedPassword = bcrypt.hashSync(hashedPassword, 10);

      user = await this.model.create({
        firstName,
        lastName,
        email,
        hashedPassword: encryptedPassword,
      });
      return res
        .status(200)
        .send({ status: "Ok", message: "User account created successfully!" });
    } catch (error) {
      return res
        .status(400)
        .send({ status: "Error", message: "An error has occurred" });
    }
  }

  async loginUser(req, res) {
    const { email, hashedPassword } = req.body;
    let user = await this.findUserByEmail(email);

    if (!user) return res.send({ message: "You are not registered" });

    try {
      const isPasswordMatch = bcrypt.compareSync(
        hashedPassword,
        user.hashedPassword
      );
      if (!isPasswordMatch) return res.send({ message: "Incorrect password" });

      const JWT_SECRET = process.env.JWT_SECRET;

      const token = jwt.sign({ email: user.email }, JWT_SECRET);

      return res.status(200).send({ status: "Ok", data: token });
    } catch (error) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }

  async getUserDetails(req, res) {
    const { token } = req.body;

    if (!token) {
      res.status(401).send({ message: "Something went wrong" });
    }

    try {
      const JWT_SECRET = process.env.JWT_SECRET;

      const user = jwt.verify(token, JWT_SECRET);
      const userEmail = user.email;
      const userData = await this.findUserByEmail(userEmail);

      return res.send({ status: "OK", data: userData });
    } catch (error) {
      return res.send({ status: "Error", message: "An error has occurred" });
    }
  }
}

module.exports = ValidatorsController;
