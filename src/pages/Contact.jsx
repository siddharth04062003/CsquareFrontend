import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/contact', formData);
      setStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you soon.'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.error || 'Failed to send message. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'hello@c-square.club',
      link: 'mailto:hello@c-square.club'
    },
    {
      icon: '💬',
      label: 'Discord',
      value: 'Join our community',
      link: '#'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'University Campus',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen pt-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-orbitron font-bold text-center mb-16 neon-text">
            GET IN TOUCH
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card"
            >
              <h2 className="text-2xl font-orbitron font-bold text-white mb-6">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black bg-opacity-50 border-2 border-gray-600 rounded-lg focus:border-neon-cyan focus:outline-none text-white transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black bg-opacity-50 border-2 border-gray-600 rounded-lg focus:border-neon-cyan focus:outline-none text-white transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black bg-opacity-50 border-2 border-gray-600 rounded-lg focus:border-neon-cyan focus:outline-none text-white transition-colors duration-300"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="join">Join the Club</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="event">Event Related</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black bg-opacity-50 border-2 border-gray-600 rounded-lg focus:border-neon-cyan focus:outline-none text-white transition-colors duration-300"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-black bg-opacity-50 border-2 border-gray-600 rounded-lg focus:border-neon-cyan focus:outline-none text-white transition-colors duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {status.message && (
                  <div className={`p-4 rounded-lg ${
                    status.type === 'success' 
                      ? 'bg-green-500 bg-opacity-20 border border-green-500 text-green-400'
                      : 'bg-red-500 bg-opacity-20 border border-red-500 text-red-400'
                  }`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-orbitron font-bold text-white mb-6">
                Contact Information
              </h2>

              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="card flex items-center space-x-4 hover:scale-105 block"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full flex items-center justify-center text-black text-xl">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{info.label}</h3>
                    <p className="text-gray-300">{info.value}</p>
                  </div>
                </motion.a>
              ))}

              <div className="card">
                <h3 className="text-xl font-orbitron font-bold text-white mb-4">
                  Why Contact Us?
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Join our coding community</li>
                  <li>• Collaborate on projects</li>
                  <li>• Attend workshops and events</li>
                  <li>• Get mentorship and support</li>
                  <li>• Network with like-minded developers</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
