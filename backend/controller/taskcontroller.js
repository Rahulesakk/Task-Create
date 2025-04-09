const dotenv = require('dotenv');
let taskData = require('./taskdata.json')
const fs = require('fs');
const path = require('path');

exports.fetchAllTasks = async (req,res) =>{
    try{
        let data = taskData 
        return res.status(200).json({
            success:"True",
            message:"Data Fetched Successfully",
            data
        })
    }catch(err){
        return res.status(500).json({
            success:"False",
            message:"Internal Server Error"
        })
    }
}

exports.addNewTask = async (req,res) => {
    try{
        const filePath = path.join(__dirname, 'taskdata.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        const tasks = JSON.parse(data);
        const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

        const newTask = {
            id: newId,
            Desc:req.body.desc,
            status:'To Do'
          };
          
         
          tasks.push(newTask);

          fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

         return res.status(200).json({
            success:"True",
            message:"Data Added Successfully"
         }) 

    }catch(err){
        return res.status(500).json({
            success:"False",
            message:"Internal Server Error"
        })
    }
}

exports.updateTask = async (req,res) =>{
    try{
        console.log(req.query)
        let {id} = req.query
        const filePath = path.join(__dirname, 'taskdata.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        const tasks = JSON.parse(data);

        let index = tasks.findIndex((item)=>item.id==id)
        if (index !== -1) {
            tasks[index].title =tasks[index].title
            tasks[index].status = req.body.status;
          
            fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
          
            return res.status(200).json({
                success:"True",
                message:`Task with ID ${id} Updated.`
            })
          } else {
            return res.status(400).json({
                success:"false",
                message:`Task with ID ${id} not found.`
            })
          }

    }catch(err){
        return res.status(500).json({
            success:"False",
            message:"Internal Server Error"
        })
    }
}