const express=require('express');
const Student = require('../models/Student');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const mentorID="E5641"
//Fetch all Students
router.get("/getstudents",async (req, res) => {
    try {
      const students = await Student.find({});
      res.json(students);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  });

  router.post("/resetstudents",async (req, res) => {
    try {
      const newstudent = {};
      newstudent.mentor = "None";
      newstudent.Ideation = "";
      newstudent.Execution = "";
      newstudent.Viva = "";
      newstudent.isChecked="";
      const students = await Student.find({});
      student = await Student.updateMany(
        {},
        { $set: newstudent },
        { new: true }
      );
      res.json({message:"Whole database reset"})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  });

  router.post("/updatemarks", async (req, res) => {
    try {
      const {Ideation, Execution,Viva,mentor,id } = req.body;
      const newstudent = {};
      newstudent.Ideation = Ideation;
      newstudent.Execution = Execution;
      newstudent.Viva = Viva;
      let student = await Student.findOne({id:id});
      if (!student) return res.status(404).send("Not Found");
      if(student.isChecked!=="yes" && student.mentor==mentor)
      {
        student = await Student.findOneAndUpdate(
          {id:id},
            { $set: newstudent },
            { new: true }
          );
          res.json(student);
      }
      else
      res.json({message:"You cannot change this student Mask"});
      
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  });

  router.post("/addStudent", async (req, res) => {
    try {
      const {id, mentor} = req.body;
      const newstudent = {};
      newstudent.mentor = mentor;
      let student = await Student.findOne({id:id});
      if (!student) return res.status(404).send("Not Found");
      if(student.mentor!="None")
      res.json({error:"This student is already assigned"})
      else{
        student = await Student.findOneAndUpdate(
          {id:id},
            { $set: newstudent },
            { new: true }
          );
          res.json(student);
      }     
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  });

  router.post("/getselectedstudents",async (req, res) => {
    try {
        const {mentor} = req.body;
      const students = await Student.find({mentor:mentor});
      res.json(students);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  });

  router.post("/removestudent", async (req, res) => {
    try {
      const { mentor,id} = req.body;
      const newstudent = {};
      newstudent.mentor = "None";
      let student = await Student.findOne({id:id});
      if (!student) return res.status(404).send("Not Found");
      if(student.mentor!=mentor)
      res.json({error:"This is not your Student"})
      else{
        student = await Student.findOneAndUpdate(
          {id:id},
            { $set: newstudent },
            { new: true }
          );
          res.json(student);
      }
  
      
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  });

  router.get("/getlockedstudents",async (req, res) => {
    try {
        const { mentor } = req.body;
      const students = await Student.find({mentor:mentor,isChecked:"yes"});
      res.json(students);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  });

  router.get("/getunlockedstudents",async (req, res) => {
    try {
        const { mentor } = req.body;
      const students = await Student.find({mentor:mentor,isChecked:""});
      res.json(students);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  });

  router.post("/lockstudents", async (req, res) => {
    try {
      const {mentor} = req.body;
      const newstudent = {};
      newstudent.isChecked = "yes";
      let student = await Student.find({mentor:mentor});
      if (!student) return res.status(404).send("Not Found");
  
      student = await Student.updateMany(
        {mentor:mentor},
        { $set: newstudent },
        { new: true }
      );
      student = await Student.find({mentor:mentor});
      res.json(student);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  });
  

  module.exports=router;