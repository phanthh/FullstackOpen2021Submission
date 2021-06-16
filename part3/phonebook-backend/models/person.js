const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const url = process.env.MONGO_URI;

console.log("connecting to: ", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("failed to connect to MongoDB", err.message);
  });

const personSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    minLength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: (v) => v.replace(/[^0-9]/g, "").length >= 8,
      message: (props) => `${props.value} must have at least 8 digits!`,
    },
  },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
