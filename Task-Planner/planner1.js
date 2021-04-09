let url = require("url");
let http = require("http");
let fs = require("fs");
let port = 9090;

let addTask = `
    <h2 style="color: chocolate;">Add Tasks</h2>
    <form action="" method="get">
        <label>Emp ID: </label>
        <input type="text" name="empId"/><br/>
        <label>Task ID: </label>
        <input type="text" name="taskId"/><br/>
        <label>Task: </label>
        <input type="text" name="task"/><br/>
        <label>Deadline: </label>
        <input type="date" name="deadline"/><br/>
        <input type="submit" value="Add">
        <input type="reset" value = "Reset">
    </form>
    <br/>
    <a href="/delete">Delete Task</a>
    <a href="/display">Display Tasks</a>
    <br/>
`;

let deleteTask=`

<form action="/delete" method="get">
    <h2 style="color: darkred;">Delete Task</h2>
    <label>Task ID: </label>
    <input type ="text" name="taskId" required>
    <br>
    <input type="submit" value="Delete">
    <input type="reset" value="Reset">
    
  
 </form>
 <br>
 <a href="/">Add Task</a>
 <a href="/display">Display All Tasks</a> 
 <br/>
`;

let TaskTable = `
<h2 style="color: forestgreen;">Display Tasks</h2>
    <table>
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>Task ID</th>
                <th>Task Description</th>
                <th>Deadline</th>
            </tr>
        </thead>
        <tbody>        
`

let OptionTable = `
        </tbody>
    </table>
    <br>
    <a href = "/">Add Task</a>
    <a href="/delete">Delete Task</a>
    <br>
`;


let server = http.createServer((req, res) => {
    res.setHeader("content-type", "text/html");

    // read previous tasks from JSON and store it in an array
    let taskStr = fs.readFileSync("tasks.json").toString();
    let items = new Array();
    if (taskStr != "") {
        items = JSON.parse(taskStr);
    }

    if (req.url != "/favicon.ico") {            
        if (req.url == "/") {                  
            res.write(addTask);
        } else if (req.url.startsWith("/?")) {  // Add Task page after a task has been added
            res.write(addTask);
            
            
            let data = url.parse(req.url, true).query;
            //make task id unique by removing redundant tasks
            let redundant_task = false; //assume no duplicate tasks
            for (let i = 0; i < items.length; i++) {
                if (items[i].taskId == data.taskId) {
                    redundant_task = true;
                }
            }
            if (redundant_task) {
                res.write("Task ID already exists")
            } else if(data.taskId == "") {
                res.write("Missing Task ID")
            } else {
                // convert data to task
                let task = { "empId": data.empId, "taskId": data.taskId, "task": data.task, "deadline": data.deadline };
                // store task in array using push
                items.push(task);
                res.write("Task Added Successfully");
            }
            
            updated_tasks = JSON.stringify(items);

            fs.writeFileSync("tasks.json", updated_tasks);
        } else if (req.url == "/delete") {              
            res.write(deleteTask);
        } else if (req.url.startsWith("/delete?")) {    // Delete Task page after a task has been deleted
            res.write(deleteTask);
            // take data from url
            let urlDetails = req.url;
            let data = url.parse(urlDetails, true).query;
            
            let flag = false;
            for (let i = 0; i < items.length; i++) {
                if (items[i].taskId == data.taskId) {
                    items.splice(i, 1);
                    flag = true;
                }
            }
            if (!flag) {
                res.write("Task ID not found");
            } else {
                res.write("Task Deleted Successfully");
            }
           
            updated_tasks = JSON.stringify(items);
            fs.writeFileSync("tasks.json", updated_tasks);
        } else if (req.url == "/display") { 
            
            res.write(TaskTable);
            
            for (let i = 0; i < items.length; i++) {
                let row = `
                    <tr>
                        <td>${items[i].empId}</td>
                        <td>${items[i].taskId}</td>
                        <td>${items[i].task}</td>
                        <td>${items[i].deadline}</td>
                    </tr>
                `
                res.write(row);
            }
            res.write(OptionTable);
        }
    }
    res.end();
});

server.listen(port, ()=>console.log(`Server running on port ${port}`));