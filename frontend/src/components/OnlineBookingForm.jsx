import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SuccessPopup from './SuccessPopup';

const OnlineBookingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    dateOfEvent: '',
    eventSlot: '',
    eventType: '',
    numberOfGuests: '',
    decorationType: [],
    cateringType: [],
    soundLighting: [],
    banquetName: '', // New field
    banquetCity: ''  // New field
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredBanquets, setFilteredBanquets] = useState([]);

  // Hardcoded banquet data from BanquetBranches.jsx
  const banquetBranches = [
    {
      id: 1,
      name: "Fairmont Banquet",
      city: "Karachi",
      address: "E-90, Block 4, Maskan Chowrangi, Gulshan Iqbal, Karachi, Pakistan",
      description: "Celebrate your unique stories at Fairmont banquet for weddings and other special gatherings.",
      phone: "+92 321 6576 011",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 2,
      name: "Oasis Banquets",
      city: "Karachi",
      address: "D-4, Block L, Near 5 Star Roundabout, North Nazimabad, Karachi, Pakistan 74700",
      description: "Capture the beautiful memories of functions with your family and friends at the Oasis Banquets.",
      phone: "+92 321 6576 012",
      rating: 4.3,
      reviews: 85,
    },
    {
      id: 3,
      name: "Roses Banquet",
      city: "Karachi",
      address: "D-3 Block L, North Nazimabad, Karachi, Pakistan 74600",
      description: "Luxurious and grand wedding banquet, ideal for every type of party.",
      phone: "+92 310 6225553",
      rating: 4.7,
      reviews: 150,
    },
    {
      id: 4,
      name: "Victoria Banquet",
      city: "Karachi",
      address: "Victoria banquet located in the heart of Karachi",
      description: "Get the Grand decor in your budget at Victoria Banquet.",
      phone: "021-34385022-1",
      rating: 4.4,
      reviews: 95,
    },
    {
      id: 5,
      name: "Himalaya Banquets",
      city: "Karachi",
      address: "Block 4 Gulshan-e-Iqbal, Karachi",
      description: "Specializes in creating unforgettable experiences for all of your memorable occasions.",
      phone: "+92 321 6576 013",
      rating: 4.6,
      reviews: 110,
    },
    {
      id: 6,
      name: "Bellagio Banquet",
      city: "Karachi",
      address: "C-18 & C19 Main Sharah e Pakistan, Block 6, Federal B Area, Karachi, Pakistan",
      description: "Every event should be a reflection of your unique style and personality.",
      phone: "(021) 36425563",
      rating: 4.8,
      reviews: 200,
    },
    {
      id: 7,
      name: "Mehmaan Khana Marriage Hall",
      city: "Lahore",
      address: "Lahore, Pakistan",
      description: "THE BEST WEDDING VENUE IN LAHORE with wonderful decor and hygienic food.",
      phone: "+92 321 6576 011",
      rating: 4.5,
      reviews: 180,
    },
    {
      id: 8,
      name: "Grand Pavilion Banquet Hall",
      city: "Lahore",
      address: "Golf & Country Club, Hall # 7, Wedding Halls, Garrison, Saddar Town, Lahore, Punjab 54000",
      description: "The longest-standing establishments in the Complex with exclusive offerings.",
      phone: "+92 321 6576 014",
      rating: 4.2,
      reviews: 75,
    },
    {
      id: 9,
      name: "Le Grand Chalet Royal",
      city: "Lahore",
      address: "410, Block D2, Phase-1, Johar Town, Lahore, Pakistan 54782",
      description: "Another milestone achieved to cater your dream Events.",
      phone: "+92 321 6576 015",
      rating: 4.9,
      reviews: 165,
    },
    {
      id: 10,
      name: "Majestic Marquee",
      city: "Islamabad",
      address: "2-A Club Rd, Shakar Parlan, Islamabad",
      description: "Stands as the most prestigious venue in the twin cities, offering unparalleled elegance.",
      phone: "+92 321 6576 016",
      rating: 4.7,
      reviews: 220,
    },
    {
      id: 11,
      name: "Marhaba Marquee",
      city: "Islamabad",
      address: "Islamabad, Pakistan",
      description: "A breathtaking wedding venue that creates memorable experiences.",
      phone: "+92 321 6576 017",
      rating: 4.4,
      reviews: 130,
    },
  ];

  const eventSlots = [
    'Morning (9AM-12PM)',
    'Afternoon (1PM-4PM)',
    'Evening (6PM-9PM)',
    'Night (10PM-2AM)'
  ];

  const decorationOptions = [
    'Flowers',
    'Fabric Draping',
    'Table Settings',
    'Backdrops',
    'Balloons',
    'Themed Decor',
    'Signs & Banners'
  ];

  const cateringOptions = [
    'Buffet',
    'Plated Service',
    'Family Style',
    'Appetizers',
    'Food Stations',
    'Drinks & Bar'
  ];

  const soundLightingOptions = [
    'Need a DJ setup',
    'Want soft, warm lighting',
    'Professional microphone setup',
    'Colored lighting effects',
    'Spotlights for stage',
    'Logo projection',
    'Mood lighting'
  ];

  // Filter banquets by city when city changes
  useEffect(() => {
    if (formData.banquetCity) {
      const filtered = banquetBranches.filter(banquet => banquet.city === formData.banquetCity);
      setFilteredBanquets(filtered);
    } else {
      setFilteredBanquets([]);
    }
  }, [formData.banquetCity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          [field]: [...prev[field], value]
        };
      } else {
        return {
          ...prev,
          [field]: prev[field].filter(item => item !== value)
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/online-booking', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        setShowSuccessPopup(true);
      }

    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("This time slot is already booked for the selected venue. Please choose a different date, time slot, or venue.");
      } else {
        toast.error("An error occurred. Please try again later.", error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);   
    onClose();
  }

  // Get unique cities from banquetBranches
  const cities = [...new Set(banquetBranches.map(banquet => banquet.city))];

  return (
    <>
      <div className="bg-white p-6 rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#800020]">Online Venue Booking</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type of Event</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
              >
                <option value="">Select Event Type</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate">Corporate</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Venue Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                name="banquetCity"
                value={formData.banquetCity}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
              <select
                name="banquetName"
                value={formData.banquetName}
                onChange={handleChange}
                required
                disabled={!formData.banquetCity}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] disabled:opacity-50"
              >
                <option value="">Select Venue</option>
                {filteredBanquets.map(banquet => (
                  <option key={banquet.id} value={banquet.name}>
                    {banquet.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Event</label>
              <input
                type="date"
                name="dateOfEvent"
                value={formData.dateOfEvent}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Slot/Time</label>
              <select
                name="eventSlot"
                value={formData.eventSlot}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
              >
                <option value="">Select Time Slot</option>
                {eventSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Decoration Type (Select all that apply)</label>
            <div className="grid grid-cols-2 gap-2">
              {decorationOptions.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.decorationType.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, 'decorationType')}
                    className="mr-2 text-[#800020] focus:ring-[#800020]"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Catering Type (Select all that apply)</label>
            <div className="grid grid-cols-2 gap-2">
              {cateringOptions.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.cateringType.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, 'cateringType')}
                    className="mr-2 text-[#800020] focus:ring-[#800020]"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sound & Lighting Requirements (Select all that apply)</label>
            <div className="grid grid-cols-1 gap-2">
              {soundLightingOptions.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.soundLighting.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, 'soundLighting')}
                    className="mr-2 text-[#800020] focus:ring-[#800020]"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#800020] text-white rounded-md hover:bg-[#600018] disabled:opacity-50"
            >
              {loading ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </form>
      </div>
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={handleSuccessClose}
        message="Your slot has been partially booked kindly visit the onsite office within two days to confirm the booking, otherwise after two days your partial booking will be revoked. Thank you."
      />
    </>
  );
};

export default OnlineBookingForm;