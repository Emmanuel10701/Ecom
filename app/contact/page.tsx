"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { IoLocation } from 'react-icons/io5';
import { MdMarkEmailRead } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Clear form fields
    } catch (error) {
      toast.error('An error occurred, please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-center text-3xl mx-auto my-10 font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
        initial="hidden"
        animate="visible"
      >
        Get In Touch
      </motion.h1>

      <div className="flex flex-col md:flex-row px-8 gap-8">
        <motion.div
          className="flex flex-col flex-1 md:pl-20"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl font-extrabold mb-9 text-center md:text-start mt-5 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
            We're Here to Help
          </h1>
          <p className="text-sm text-slate-500 mb-5">
            Have questions about our products, need help with an order, or want to provide feedback? Our team is here to assist you. Whether you have inquiries about our product range, need support with an existing order, or require help with returns and exchanges, don't hesitate to reach out. We’re committed to providing exceptional customer service and ensuring a smooth shopping experience for you.
          </p>
          <div className="flex items-start mt-6">
            <MdMarkEmailRead className="text-green-500 text-xl" />
            <h2 className="text-sm font-bold ml-2">support@ecommerce.com</h2>
          </div>
          <div className="flex items-start mt-6">
            <FaPhone className="text-green-500 text-xl" />
            <h2 className="text-sm font-bold ml-2">+123 456 7890</h2>
          </div>
          <div className="flex items-start mt-6">
            <IoLocation className="text-green-500 text-xl" />
            <h2 className="text-sm font-bold ml-2">123 E-Commerce St, Shop City, EC 12345</h2>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col flex-1 mt-10 md:mt-0"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col mt-3 w-full max-w-md mx-auto">
              <label htmlFor="name" className="mb-1 text-sm font-semibold">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-slate-100 p-3 text-sm rounded-md"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="flex flex-col mt-3 w-full max-w-md mx-auto">
              <label htmlFor="email" className="mb-1 text-sm font-semibold">Your Email</label>
              <input
                type="email"
                id="user_email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-slate-100 p-3 text-sm rounded-md"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="flex flex-col mt-3 w-full max-w-md mx-auto">
              <label htmlFor="message" className="mb-1 text-sm font-semibold">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-slate-100 resize-none text-sm rounded-md p-3"
                placeholder="Enter your message here"
                rows={4}
                required
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                disabled={loading}
              >
                {loading ? (
                "sibmitting..."
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Contact;
