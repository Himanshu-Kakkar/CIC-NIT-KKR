// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const Admin = require("../models/adminSchema");

// mongoose.set('strictQuery', false);  // To suppress the warning

// mongoose.connect("mongodb://localhost:27017/admindetails", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log("MongoDB Connected");
// }).catch((err) => {
//   console.error("MongoDB Error:", err);
// });

// async function createAdmin() {
//   try {
//     // Check if the admin already exists based on email
//     const existingAdmin = await Admin.findOne({ email: "Nick@example.com" });
//     if (existingAdmin) {
//       console.log("Admin already exists!");
//       mongoose.disconnect();
//       return;  // Stop further execution
//     }

//   //  If admin doesn't exist, create a new admin
 
//     const hashedPassword = await bcrypt.hash("admin123", 10);

//     const newAdmin = new Admin({
//       email: "Nickjo@example.com",
//       id: "admin005",
//       password: hashedPassword
//     });

//     // Save the new admin
//     await newAdmin.save();
//     console.log("Admin created successfully!");
//     mongoose.disconnect();
//   } catch (error) {
//     console.error("Error in creating admin:", error);
//     mongoose.disconnect();
//   }
// }

// createAdmin();
