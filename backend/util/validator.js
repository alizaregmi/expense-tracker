const { check } = require("express-validator");

const registerValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  // .normalizeEmail({
  //   gmail_remove_dots: true,
  // }),
  check("password", "Password is required").not().isEmpty(),
];

const loginValidator = [
  check("email", "Please enter a valid email").isEmail(),
  // .normalizeEmail({
  //   gmail_remove_dots: true,
  // }),
  check("password", "Password is required").not().isEmpty(),
];

const passwordValidator = [
  check("password", "Password is required").not().isEmpty(),
  check("confirmPassword", "Confirm password is required").not().isEmpty(),
  check("confirmPassword", "Passwords do not match").custom(
    (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }
  ),
];

const forgotValidator = [
  check("email", "Please enter a valid email").isEmail(),
  // .normalizeEmail({
  //   gmail_remove_dots: true,
  // }),
];

const incomeValidator = [
  check("title", "Please enter  title").not().isEmpty(),
  check("amount", "Please enter  amount").not().isEmpty(),
  check("category", "Please choose  category").not().isEmpty(),
  check("description", "Please enter  description").not().isEmpty(),
  check("date", "Please choose  date").not().isEmpty(),
];

module.exports = {
  registerValidator,
  loginValidator,
  passwordValidator,
  forgotValidator,
  incomeValidator,
};
