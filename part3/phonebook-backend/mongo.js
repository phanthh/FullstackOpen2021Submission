const mongoose = require("mongoose");

const invalidOutput = `
Invalid arguments
Use:
	node mongo.js <password>
	node mongo.js <password> <personName> <personNumber>
`;

if (process.argv.length < 3) {
  console.log(invalidOutput);
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://phanth:${password}@testing0.nfew0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    persons.map((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((res) => {
    console.log("person saved", res);
    mongoose.connection.close();
  });
} else {
  console.log(invalidOutput);
  process.exit(1);
}
