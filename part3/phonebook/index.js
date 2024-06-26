const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();


app.use(express.static('dist'))
app.use(express.json());

app.use(cors())

morgan.token('content', function (req, res) { return JSON.stringify(req.body) })


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get("/api/persons", (request, response) => {
    response.json(persons);
})

app.get("/info", (request, response) => {
    response.end(  
        `<p>Phonebook has info for ${persons.length}</p>
         <p>${new Date()}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === parseInt(id));
    if (person) {
        response.json(person);
    } else {
        response.status(404).send();
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id != parseInt(id));
    response.status(204).end();
})

const generateId = Math.round(Math.random() * 10000000);


app.post("/api/persons", (request, response) => {
    const body = request.body;
    if (!body.name || !body.number || persons.some(person => person.name === body.name)) {
        response.status(400).json({
            error : "no name, number or name already in phonebook"
        })
    }
    const person = {
        name : body.name, 
        number : body.number,
        id : generateId
    }
    persons = persons.concat(person);
    console.log(person);
    response.json(person);

})


const PORT = process.env.PORT || 3001
app.listen(PORT);