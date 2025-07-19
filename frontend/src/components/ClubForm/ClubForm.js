import React, { useState, useEffect } from "react";
import { clubData } from "../../Data/data";

const ClubForm = ({ onClose, clubName }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    course: "",
    year: "",
    purpose: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [clubPhoneNumber, setClubPhoneNumber] = useState("");
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  useEffect(() => {
    const club = clubData.find(club => club.name === clubName);
    if (club) setClubPhoneNumber(club.phNumber);
  }, [clubName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setFormData(prev => ({ ...prev, year: "" }));
  }, [formData.course]);

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "Please enter your full name";
    if (!formData.email) errors.email = "Please enter your email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Please enter a valid email";
    if (!formData.mobileNumber) errors.mobileNumber = "Please enter your mobile number";
    else if (!/^\d{10}$/.test(formData.mobileNumber)) errors.mobileNumber = "Mobile number must be 10 digits";
    if (!formData.course) errors.course = "Please select your course";
    if (!formData.year) errors.year = "Please select your year";
    if (!formData.purpose) errors.purpose = "Please enter your purpose";
    return errors;
  };

  const isYearDisabled = (year) => {
    const yearNum = parseInt(year);
    if (!formData.course) return false;
    if (["MBA", "M.Sc", "M.Tech"].includes(formData.course)) return yearNum > 2;
    if (formData.course === "MCA") return yearNum > 3;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const message = `${clubName} Query from :-

Name: ${formData.fullName}
Email: ${formData.email}
Mobile: ${formData.mobileNumber}
Course: ${formData.course}
Year: ${formData.year}
Purpose: ${formData.purpose}`;

      if (!clubPhoneNumber) {
        alert("Club phone number not found. Please try again later.");
        return;
      }

      const whatsappUrl = `https://wa.me/${clubPhoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
      const newWindow = window.open(whatsappUrl, "_blank");

      if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
        setShowWhatsAppPopup(true);
        return;
      }

      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        course: "",
        year: "",
        purpose: "",
      });

      if (onClose) onClose();
    }
  };

  const handleDownloadWhatsApp = () => {
    window.open("https://www.whatsapp.com/download", "_blank");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#edeef2] p-5">
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <div className="p-10">
          <h2 className="text-center text-gray-700 text-2xl font-semibold mb-8 mt-5">Contact {clubName || "Club"}</h2>

          {/* Input Fields */}
          {[
            { label: "Full Name", id: "fullName", type: "text", placeholder: "Enter your full name" },
            { label: "Mobile Number", id: "mobileNumber", type: "tel", placeholder: "Enter your mobile number" },
            { label: "Email ID", id: "email", type: "email", placeholder: "Enter your email address" },
          ].map(({ label, id, type, placeholder }) => (
            <div className="mb-6" key={id}>
              <label htmlFor={id} className="block text-sm text-gray-700 mb-2 font-medium">{label}</label>
              <input
                id={id}
                type={type}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              />
              {formErrors[id] && <span className="text-red-600 text-xs mt-1 block">{formErrors[id]}</span>}
            </div>
          ))}

          {/* Course */}
          <div className="mb-6">
            <label htmlFor="course" className="block text-sm text-gray-700 mb-2 font-medium">Course</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select your course</option>
              {["B.Tech", "M.Tech", "MCA", "M.Sc", "MBA"].map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            {formErrors.course && <span className="text-red-600 text-xs mt-1 block">{formErrors.course}</span>}
          </div>

          {/* Year */}
          <div className="mb-6">
            <label htmlFor="year" className="block text-sm text-gray-700 mb-2 font-medium">Year</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select your year</option>
              {[1, 2, 3, 4].map(yr => (
                <option
                  key={yr}
                  value={yr}
                  disabled={isYearDisabled(yr)}
                  className={isYearDisabled(yr) ? "text-gray-400 italic bg-gray-50" : "bg-white"}
                >
                  {yr} Year
                </option>
              ))}
            </select>
            {formErrors.year && <span className="text-red-600 text-xs mt-1 block">{formErrors.year}</span>}
          </div>

          {/* Purpose */}
          <div className="mb-6">
            <label htmlFor="purpose" className="block text-sm text-gray-700 mb-2 font-medium">Purpose</label>
            <textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              rows="4"
              placeholder="Enter your purpose for joining the club"
              className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:border-indigo-500"
            ></textarea>
            {formErrors.purpose && <span className="text-red-600 text-xs mt-1 block">{formErrors.purpose}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-4 text-white text-base font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md hover:-translate-y-1 transition-transform"
          >
            Submit
          </button>

          <div className="my-6 border-t border-gray-300"></div>
        </div>
      </div>

      {/* WhatsApp Popup */}
      {showWhatsAppPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#1a1f3c] rounded-2xl p-8 max-w-sm w-[90%] border border-white/10 shadow-2xl animate-slideUp text-center text-white">
            <div className="text-5xl text-green-500 mb-6 animate-pulse">
              <i className="fab fa-whatsapp"></i>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent mb-2">
              WhatsApp Not Found
            </h3>
            <p className="text-gray-300 mb-2">To contact the club, you need to have WhatsApp installed.</p>
            <p className="text-gray-300 mb-4">Please download WhatsApp to continue.</p>
            <button
              onClick={handleDownloadWhatsApp}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-2 px-6 rounded-full mb-3 shadow-lg hover:-translate-y-1 transition-transform"
            >
              Download WhatsApp
            </button>
            <br />
            <button
              onClick={() => setShowWhatsAppPopup(false)}
              className="text-gray-300 border border-gray-400 py-2 px-5 rounded-full hover:bg-white/10"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubForm;
