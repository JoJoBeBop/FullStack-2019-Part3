const express = require('express');
const morgan = require("morgan");
const app = express();
const cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');

app.use(bodyParser.json());

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },

];
/*3.8*/
morgan.token('content', function (request) {return JSON.stringify(request.body)});
app.use(morgan(':method :url :status :res[content-length] :response-time ms :content'));



app.get('/persons', (request, response) => {
    response.json(persons)
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
});
app.get('/info', (req, res) => {
    const date = new Date();
    const personsLength = persons.length;

    res.send(`<h4> This phone book has ${personsLength} numbers</h4><br><h4>${date}</h4>`)

});

/*3.3*/
app.get('/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(persons => persons.id === id);
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
});

/*3.4*/
app.delete('/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end()
});

const generateId = () => {
    const randomNumber = () => {
        const rand = Math.random() * (1000 - 100) + 1000
        return Math.round(rand)
    };
    return randomNumber()
};

/*3.6*/
app.post("/persons", (request, response) => {
    const body = request.body;

    const loopedNames = persons.map(per => per.name);

    console.log(body);
    if (!body.name || !body.number) {
        return response.status(400).json({error: "no content or content missing"})
    } else if (loopedNames.includes(body.name)) {
        return response.status(400).json({error: "name has already been submitted"})

    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    };

    persons = persons.concat(person);
    response.json(persons)
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
