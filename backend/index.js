  const express = require("express");
  const app = express();

  app.use(express.json());
  const cors = require("cors");
  const User = require('./models/studentSchema')
  app.use(cors());
  const bcrypt = require("bcryptjs");
  const adminCheck = require('./middleware/adminmiddleware')
  const tokenCheck = require('./middleware/middleware')
  const attendance = require('./models/attendenceSchema')
  const admin = require('./models/adminSchema')
  const noti=require('./models/notischema')
  const Team=require('./models/teamschema')
  const socketIo = require('socket.io');
  const http = require('http');
  const server = http.createServer(app);
  const io = socketIo(server);
  const schedule=require('./models/calendarschema')
  app.use(express.urlencoded({ extended: false }));
  const jwt = require("jsonwebtoken");
  var nodemailer = require("nodemailer");
  const attendenceSchema = require("./models/attendenceSchema");
  const database = require("./config/database");
  require("dotenv").config();


  const authRoutes=require('./routes/authRoutes')
  const eventRoutes = require("./routes/eventRoutes");
  


  //server running status 
  database.connect();

  const PORT = process.env.PORT || 5001;

  const JWT_SECRET = process.env.JWT_SECRET;

  app.listen(PORT,()=>{
    console.log(`App is running ar ${PORT}`);
  })

  app.use((req, res, next) => {
    console.log(req.headers);
    next();
  });


    app.use('/api/auth', authRoutes);
      app.use("/api/event", eventRoutes);










  //forgot password route


  // app.post("/forgot-password", async (req, res) => {
  //   const { email } = req.body;
  //   try {
  //     const oldUser = await User.findOne({ email });
  //     if (!oldUser) {
  //       return res.json({ status: "User Not Exists!!" });
  //     }
  //     const secret = JWT_SECRET + oldUser.password;
  //     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
  //       expiresIn: "1hr",
  //     });
  //     const link = `http://localhost:5001/reset-password/${oldUser._id}/${token}`;
  //     var transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: "testingpurpose857@gmail.com",
  //         pass: "ujlfuxowrfrdhopl",
  //       },
  //     });

  //     var mailOptions = {
  //       from: "scbcordinaters@gmail.com",
  //       to: req.body.email,
  //       subject: "Password Reset",
  //       text: link,
  //     };

  //     transporter.sendMail(mailOptions, function (error, info) {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log("Email sent: " + info.response);
  //       }
  //     });
  //     console.log(link);
  //   } catch (error) { }
  // });

  //reset password route

  app.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
  });

  app.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );

      res.send({ email: verify.email, status: "verified" });
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
  });

  //admin routes 

  // endpoints are : attendence management , student management , notification management , 

  // attendence endpoints
  app.get('/getuser', async (req, res) => {
    try {
      const attendances = await User.find({}, { _id: 0, name: 1, status: 1 });
      res.send({ status: "ok", data: attendances })
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving attendance data');
    }
  });

  app.post("/submit-attendence",adminCheck, async (req, res) => {
    try {
      const attendanceData = req.body.attendanceData;
      const date = new Date(req.body.date);

      const attendanceReport = new attendance({
        attendanceData: attendanceData.map(({ name, status }) => ({
          name,
          status,
          date
        }))
      });
      attendanceReport.date = date;
      await attendanceReport.save();


      res.status(200).json({ message: 'Attendance data saved successfully' });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error saving attendance data' });
    }


  })



  // search for particular attendance 

  app.post('/getattendancebydate', adminCheck, async (req, res) => {
    try {
      const requestedDate = req.body.date; // Get the date from the request body
      const attendanceRecord = await attendance.findOne({ date: requestedDate }); // Find the attendance record for the requested date
      if (!attendanceRecord) {
        return res.status(404).send('Attendance data not found for the requested date');
      }
      const data = attendanceRecord.attendanceData.map(ad => ({
        name: ad.name,
        status: ad.status
      }));
      res.send({ status: "ok", data: data });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving attendance data');
    }
  });



  //notifcation management

  app.post('/notify-all', async (req, res) => {
    try {
      // Get the title and message from the request body
      const { title, content } = req.body;
      
      // Create a new notification with the title and message
      const notification = new noti({
        title,
        content,
      });
      
      // Save the notification to the database
      await notification.save();
      
      // Send the notification to all students using Socket.IO
      io.emit('notification', notification);
      
      // Send a response indicating success
      res.status(200).send('Notification sent to all students!');
    } catch (err) {
      // Send a response indicating failure
      console.error(err);
      res.status(500).send('Failed to send notification.');
    }
    let notificationReceived = false;

  io.on('notification', (data) => {
    if (!notificationReceived) {
      // handle the notification
      notificationReceived = true;
    }
  });

  });

  // Get notifications for a student
  app.get('/api/notifications',tokenCheck, async (req, res) => {
    try {
      const notifications = await noti.find({},{_id:0, createdAt:0});

      res.send(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error getting notifications');
    }
  });

  //team management  routes

  //--->1:add teams route
  app.post('/addteams', adminCheck, async (req, res) => {
    const { teamNumber, studentNames } = req.body;
    const newTeam = new Team({
      teamNumber,
      studentNames: studentNames.map(name => ({ name }))
    });

    await newTeam
      .save()
      .then(() => {
        res.status(201).json({ message: 'Team added successfully.' });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //--->2: update routes





  //student routes







  app.get("/getAllUser", async (req, res) => {
    try {
      const allUser = await User.find({});
      res.send({ status: "ok", data: allUser });
    } catch (error) {
      console.log(error);
    }
  });



  app.post("/deleteUser", async (req, res) => {
    const { userid } = req.body;
    try {
      User.deleteOne({ _id: userid }, function (err, res) {
        console.log(err);
      });
      res.send({ status: "Ok", data: "Deleted" });
    } catch (error) {
      console.log(error);
    }
  });






  //calender routes





  app.post("/calendarschema", async (req, res) => {
    try {
      const { title, start, end } = req.body;
      const newCalender = await schedule.create({
        title,
        start,
        end
      });
      return res.status(201).json(newCalender);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
  });

  app.get("/calendarschema", async (req, res) => {
    try {
      const calendarschema = await Calender.find();
      return res.status(200).json(calendarschema);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
  });

  app.put("/calendarschema/:id", async (req, res) => {
    try {
      const { title, start, end } = req.body;
      const existingCalender = await schedule.findByIdAndUpdate(
        req.params.id,
        { title, start, end },
        { new: true }
      );
      if (!existingCalender) {
        return res.status(404).send("event not found");
      }
      return res.status(200).json(existingCalender);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
  });

  app.delete("/calendarschema/:id", async (req, res) => {
    try {
      const existingCalender = await schedule.findByIdAndDelete(
        req.params.id
      );
      if (!existingCalender) {
        return res.status(404).send("EventS not found");
      }
      return res.status(200).send("EventS deleted successfully");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
  });




  //team routes
  /* 1-->new 
  2-->edit 
  3-->delete*/

  //newTeam create route

  app.post('/addteam',adminCheck,async(req,res)=>{
    try{
    const {teamNumber,studentNames}=req.body
    const newTeam = await Team.create({
    teamNumber,studentNames
    });
    return res.status(201).json(newTeam);
  }catch (err) {
    console.error(err);
    return res.status(500).send("error");
  }
  });


  //get team details when user is choosed


  app.post('/getteams', async (req, res) => {
    try {
      const teamNo = parseInt(req.body.teamNo);

      const teams = await Team.find({ teamNumber: teamNo });
    

      if (!teams || teams.length === 0) {
        return res.status(404).json({ error: 'No teams found' });
      }

      const studentNames = teams.map(team => {
        return team.studentNames.map(student => {
          return { name: student.name };
        });
      }).flat();

      return res.status(200).json({ studentNames });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error');
    }
  });




  //edit route

  app.put('/editteam', adminCheck, async (req, res) => {
    try {
      const { teamNumber, studentNames } = req.body;
      const updatedTeam = await Team.findOneAndUpdate(
        { teamNumber: teamNumber },
        { studentNames: studentNames },
        { new: true }
      );
      if (!updatedTeam) {
        return res.status(404).send('Team not found');
      }
      return res.status(200).json(updatedTeam);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error updating team');
    }
  });


  //delete overall team
  app.delete('/deleteteam', adminCheck, async (req, res) => {
    try {
      const { teamNumber } = req.body;
      const deletedTeam = await Team.findOneAndDelete({ teamNumber: teamNumber });
      if (!deletedTeam) {
        return res.status(404).send("Team not found");
      }
      return res.status(200).json(deletedTeam);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error deleting team");
    }
  });






