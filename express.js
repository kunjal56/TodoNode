const express = require("express");

const app = express();

app.use(express.urlencoded({extends: true}));

app.set("view engine" , "ejs");

var classTask = [
    {
        id : 1,
        title : "TODO PR"
    }
]

app.get("/", (req,res) => {
    res.render("index", {
        classTask: classTask
    })
});

app.post("/insertData", (req,res) => {
    const { id, title } = req.body;

    let obj = {
        id: id,
        title: title
    }

    classTask.push(obj);
    res.redirect("/");
});

app.get("/deleteData", (req, res) => {
    const id = parseInt(req.query.userid, 10);

    const data = classTask.filter((el) => el.id != id);
        classTask = data;

        res.redirect("back")
});

app.get("/editData", (req,res) => {
    const id = parseInt(req.query.userid, 10); 
    const data = classTask.find((el) => el.id === id)

    if(data) {
        res.render("edit", {
            data: data
        });
    } else {
        console.error("Task not found");
        res.redirect("/");
    }
});

app.post("/update", (req, res) => {
    const { id, title } = req.body;

    const updatedId = parseInt(id, 10);  // Ensure the id is parsed as an integer

    classTask = classTask.map((el) => {
        if (el.id === updatedId) {
            return { id: updatedId, title: title };
        }
        return el;
    });

    res.redirect("/");
});

app.listen(5000, ()=> {
    console.log("Start server")
});