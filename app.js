// ==========================================PACKAGES===========================================
const JOI = require("joi");
const express = require("express");
const sendEmail = require("./nodeEmail");
const app = express();
// ====================================== MIDDLEWARES ==========================================
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ========================================GET ROUTES==========================================
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/contact", (req, res) => {
  res.render("index", {
    message: "Welcome to EmeloApp, a very easy to use Email Platform.",
    header: "EmeloApp",
    classy: "alert-info"
  });
});
// =================================================== POST ROUTES ============================================================
app.post("/new/email", (req, res) => {
  const error = valInputs(req);
  if (error) {
    res.render("index", {
      message: error.details[0].message,
      header: "Failed To Send Email because:",
      classy: "alert-danger"
    });
    return;
  }
  sendEmail(
    "olgy.jeangilles@codeimmersives.com",
    req.body.Name,
    req.body.Email,
    req.body.textInput,
    res
  );
});
// =================================================== VALIDATION LOGIC =======================================================
function valInputs(req) {
  const schema = {
    Name: JOI.string()
      .min(3)
      .required(),
    Email: JOI.string()
      .email()
      .required(),
    textInput: JOI.string().required()
  };
  const { error } = JOI.validate(req.body, schema);

  return error;
}
// =================================================== LISTENING PORT =========================================================
const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
