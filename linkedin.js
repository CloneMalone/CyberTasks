// Client side
fetch("/api/tasks", {
  method: "POST", 
  body: JSON.stringify({ task: "Learn HTTP!" })
});

// What actually travels over the network:
// '{"task":"Learn HTTP!"}'

// Server side  
app.use(express.json());

// Middleware converts it to
// {task:"Learn HTTP!"}

app.post("/api/tasks", (req, res) => {
  console.log(req.body.task); // output: Learn HTTP!
});