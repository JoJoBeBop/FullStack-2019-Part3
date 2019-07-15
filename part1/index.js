const express = require('express');
const app = express();

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

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
});
app.get('/info', (req, res) => {
    const date = new Date();
    const personsLength = persons.length;

    res.send(
        '<h4>This phonebook has '+ personsLength + ' numbers</h4>' +
        '<h4>'+ date + '</h4>')
});

const personsLength = () => {

    const date = new Date();
};


const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0;
    return maxId + 1
};

app.post('/persons', (request, response) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    };

    persons = persons.concat(person);

    response.json(persons)
});

app.get('/persons', (request, response) => {
    response.json(persons)
});

app.get('/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(persons => persons.id === id);
    if (person) {
        response.json(persons)
    } else {
        response.status(404).end()
    }
});

app.delete('/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end()
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
