const express = require('express');
const app = express();

const path = require('path');

const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(methodOverride('_method'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let posts = [
    {
        id:uuidv4(),
        username:'umaid',
        content:'i love coding'
        
    },
    {
        id:uuidv4(),
        username:'shradha khapra',
        content:'i am coding teacher'
        
    },
    {
        id:uuidv4(),
        username:'aman',
        content:'i am a student'
        
    }
];

app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
});

app.get('/posts/new',(req,res)=>{
    res.render('new.ejs');
});

app.post('/posts',(req,res)=>{
    let {username , content} = req.body;
    posts.unshift({id:uuidv4(), username, content});
    res.redirect('/posts');
});

app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    const post = posts.find(p => p.id === id);
    res.render('view.ejs', { post });
});

app.patch('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => p.id === id);
    let new_content = req.body.content;
    post.content = new_content;
    res.redirect('/posts');
});

app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    const post = posts.find(p => p.id === id);
    res.render('edit.ejs',{post});
});

app.delete('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.filter(p => p.id !== id);
    posts = post;
    res.redirect('/posts');
});

app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
});