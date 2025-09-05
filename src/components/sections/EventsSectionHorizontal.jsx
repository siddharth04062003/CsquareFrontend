import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const EventsSectionHorizontal = () => {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => event.type === activeTab);

  // Drag handlers for horizontal scrolling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    trackRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  // Navigation button handlers
  const scrollLeftBtn = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRightBtn = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="events" className="py-20 relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-neon-cyan"></div>
            <p className="text-gray-300 mt-4">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta/10 via-transparent to-neon-cyan/10"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-orbitron font-bold mb-6">
            <span className="neon-text">Events & Activities</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join us for exciting workshops, competitions, and networking events that push the boundaries of technology
          </p>
        </motion.div>

        {/* Event Type Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-black'
                  : 'border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'past'
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-black'
                  : 'border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black'
              }`}
            >
              Past Events
            </button>
          </div>
        </motion.div>

        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">
              No {activeTab} events yet
            </h3>
            <p className="text-gray-500">
              {activeTab === 'upcoming' 
                ? 'Check back soon for exciting new events!' 
                : 'Our event history will appear here.'
              }
            </p>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Navigation Instructions */}
            <p className="text-center text-gray-400 mb-8 text-sm">
              👆 Drag to explore events or use navigation buttons
            </p>

            {/* Navigation Buttons */}
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between pointer-events-none z-20">
              <button
                onClick={scrollLeftBtn}
                className="pointer-events-auto bg-black/80 hover:bg-black/90 border-2 border-neon-cyan text-neon-cyan hover:text-white transition-all duration-300 rounded-full p-3 ml-4 shadow-lg hover:shadow-neon-cyan/30"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollRightBtn}
                className="pointer-events-auto bg-black/80 hover:bg-black/90 border-2 border-neon-cyan text-neon-cyan hover:text-white transition-all duration-300 rounded-full p-3 mr-4 shadow-lg hover:shadow-neon-cyan/30"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Events Slider Track */}
            <div
              ref={trackRef}
              className="events-track flex gap-6 overflow-x-auto overflow-y-hidden cursor-grab select-none py-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleMouseUp}
              onTouchMove={handleTouchMove}
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="event-card flex-shrink-0 relative"
                  style={{
                    width: '350px',
                    height: '480px'
                  }}
                  draggable={false}
                >
                  {/* Event Card */}
                  <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    
                    {/* Event Image */}
                    <div className="relative h-48 overflow-hidden">
                      {event.image ? (
                        <img 
                          src={event.image} 
                          alt={`${event.title} Banner`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          draggable={false}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`${event.image ? 'hidden' : 'flex'} w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center`}>
                        <div className="text-white text-4xl font-bold">
                          {event.title.charAt(0)}
                        </div>
                      </div>
                      
                      {/* Event Type Badge */}
                      <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                        event.type === 'upcoming'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}>
                        {event.type === 'upcoming' ? 'Upcoming' : 'Past'}
                      </div>
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6 flex flex-col h-72">
                      {/* Date, Time and Location */}
                      <div className="text-sm text-gray-600 mb-3 flex justify-between">
                        <span className="font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                          {event.time && ` • ${event.time}`}
                        </span>
                        {event.location && (
                          <span className="text-right text-gray-500">{event.location}</span>
                        )}
                      </div>
                      
                      {/* Event Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                        {event.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">
                        {event.description}
                      </p>
                      
                      {/* Tags */}
                      {event.tags && event.tags.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {event.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="text-xs px-3 py-1 rounded-full text-white font-medium"
                              style={{ 
                                background: tagIndex === 0 ? '#0033ff' : 
                                           tagIndex === 1 ? '#29bf12' : '#ff6b35'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Action Button */}
                      <div className="mt-auto">
                        {event.link ? (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gray-800 hover:bg-gray-900 text-white rounded-md py-3 px-4 font-semibold text-center block transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {event.linkText || 'Register'} →
                          </a>
                        ) : (
                          <button className="w-full bg-gray-400 text-white rounded-md py-3 px-4 font-semibold cursor-not-allowed">
                            {event.type === 'upcoming' ? 'Coming Soon' : 'Completed'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        {filteredEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <a
              href="/events"
              className="btn-secondary text-lg px-8 py-4 inline-block"
            >
              View All Events
            </a>
          </motion.div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-24 h-24 border border-neon-magenta opacity-20 rotate-45"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 border border-neon-cyan opacity-30 rotate-12"></div>
      <div className="absolute top-1/2 right-5 w-2 h-24 bg-gradient-to-b from-transparent via-neon-magenta to-transparent opacity-40"></div>

      <style jsx>{`
        .events-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .events-track::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default EventsSectionHorizontal;
