const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));

let tasks = [
    {name: '밥 먹기', completed: true},
    {name: '양치하기', completed: false},
]

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('test', {posts:["hi"]});
});

app.get('/to-do', (req, res) => {
    res.render('todo-list', {tasks, error: req.query.error})
})

app.post('/add-task', (req, res) => {
    const name = req.body.taskName;
    if(name && name.trim() !== '') {
        tasks.push({
            name, completed: false
        });
        res.redirect('/to-do')
    } else res.redirect('/to-do?error=할 일이 비었습니다!')
})

app.post('/complete-task', (req, res) => {
    const idx = req.body.taskIndex;
    if(idx >= tasks.length || idx < 0) res.redirect('/to-do?error=없는 일 번호입니다!')
    else if(tasks[idx].completed) res.redirect('/to-do?error=이미 완료된 일입니다!')
    else {
        tasks[idx].completed = true;
        res.redirect('/to-do');
    }
})

app.listen(3000, ()=>{console.log("Server listening on port 3000!")});