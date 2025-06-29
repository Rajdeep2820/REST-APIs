const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require("method-override")

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.set("view engine" , "ejs");
app.set(path.join(__dirname, "views")); 

app.use(express.static(path.join(__dirname , "public")));
let posts = [
    {
        id : uuidv4(),
        username : "@codeCrusader",
        data : "In a world that moves faster than our thoughts, stillness has become a superpower. While everyone races toward success defined by noise and numbers, true fulfillment often hides in the quieter corners — in the effort you gave when no one was watching, in the kindness that asked for nothing in return, in the small wins that never made it to a post. The truth is, not all growth is visible. Seeds grow in darkness before they ever bloom in light. The moments that feel slow or uncertain are often the ones where the most powerful shifts happen. So don’t rush the journey. Every delay, every detour, might just be redirecting you toward something better than what you planned. Trust that the universe isn’t working against you — it’s simply unfolding at a pace your soul understands. Keep going. Quiet progress is still progress."
    },
    {
        id : uuidv4(),
        username : "@artsyAlgo",
        data : "The Beauty of Being a Work in Progress : You’re not behind — you’re just building something that takes time. Masterpieces are never rushed. The tallest trees start as invisible roots, and diamonds are only formed under pressure. Stop comparing your Chapter 2 to someone else’s Chapter 20. The process might be messy, uncertain, even lonely at times, but that’s the sign that it’s real. Progress isn’t always loud or linear — sometimes it’s quiet discipline, silent battles, and small decisions that slowly shape greatness. Embrace being a work in progress. Growth isn't a destination, it’s a daily choice. You're becoming someone you’ll one day be proud to meet — don’t quit before you get there."
    },
    {
        id : uuidv4(),
        username : "@greenPixelFarmer",
        data : "You Matter More Than You Think : There’s someone out there whose life is a little lighter because of you — and you might not even realize it. A smile you gave, a word you said, the way you simply showed up — these things ripple in ways we never see. In a world that often tells you to chase impact in likes and follows, remember that real influence happens quietly. You matter, not because of what you do for show, but because of who you are when no one is watching. Kindness, empathy, honesty — they’re powerful, and they’re rare. So be them. The world doesn’t need more perfect people — it needs more genuine ones."
    }
]
app.get("/posts", (req,res)=>{
    res.render("index.ejs" , {posts});
})

app.get("/posts/new", (req,res)=>{
res.render("new.ejs");
})

app.post("/posts" , (req,res)=>{
    let {username , data} = req.body;
    let id = uuidv4();
    posts.push({ id , username , data});
    res.redirect("/posts"); 
});

app.get("/posts/:id" , (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs" , {post});
});
 
app.patch("/posts/:id" , (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.data;
    console.log(newContent);
    console.log(id);
    let post = posts.find((p)=> id === p.id);
    post.data = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/Edit" , (req,res)=> {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post} );
})

app.delete("/posts/:id" , (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts"); 
})

const port = 3030;
app.listen(port, () => {
 console.log("listening to port 3030");   
})