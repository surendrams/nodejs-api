const Joi = require('joi');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const exams = [
    {id:1, name:'Example Question 1'},
    {id:2, name:'Example Question 2'},
    {id:3, name:'Example Question 3'},
    {id:4, name:'Example Question 4'},
]

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/exams', (req, res) => {
    res.send(exams)
});

app.get('/api/exams/:id', (req, res) => {
    const exam = exams.find(x => x.id === parseInt(req.params.id))
    if(!exam) res.status(404).send('The given Exam id is not available')
    res.send(exam)
});

app.post('/api/exams', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const { error, value } = validateExam(exam.name);
    if(error) {
        res.status(400).send(error.details[0].message);
        return
    }
    const exam = {
        id: exams.length + 1,
        name: req.body.name
    }
    exams.push(exam)
    res.send(exams)
});

app.put('/api/exams/:id', (req, res) => {
    const exam = exams.find(x => x.id === parseInt(req.params.id))
    if(!exam) res.status(404).send('The given Exam id is not available')
       
    const { error, value } = validateExam(exam.name);
    if(error) {
        res.status(400).send(error.details[0].message);
        return
    }
    exam.name = req.body.name;
    
    res.send(exams)
});

app.delete('/api/exams/:id', (req, res) => {
    const exam = exams.find(x => x.id === parseInt(req.params.id))
    if(!exam) res.status(404).send('The given Exam id is not available')

    const index = exams.indexOf(exam);
    exams.splice(index,1);

    res.send(exam)
});


function validateExam(name) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate({ name: name});
}


app.listen(port,() => {
    console.log(`Server started and listening at ${port}`);
})

