require("dotenv").config();
const Person = require("./models/person");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// CORS
app.use(cors());

// JSONIFY RESQUEST
app.use(express.json());

// MORGAN
morgan.token("person", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

// ENDPOINTS
// getAll
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
});

// getByID
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// deleteByID
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// updateByID
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  if (body.name === undefined) {
    return res.status(400).json({ error: "name missing" });
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: "number missing" });
  }
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// addNew
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (body.name === undefined) {
    return res.status(400).json({ error: "name missing" });
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: "number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((newPerson) => {
      res.json(newPerson);
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  Person.count({}).then((length) => {
    res.send(`
		<div>
			<p>Phonebook has info for ${length} people</p>
			<p>${new Date().toUTCString()}</p>
		</div>
		`);
  });
});

// UNKNOWN ENDPOINTS
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// ERROR HANDLER
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

// LISTEN

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
