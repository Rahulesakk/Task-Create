const express = require("express");

const {fetchAllTasks,addNewTask,updateTask} = require('../controller/taskcontroller')

const router = new express.Router();

router.get("/fetchAllTask",fetchAllTasks)
router.post("/addTask",addNewTask)
router.put("/updateTask",updateTask)


module.exports = router

