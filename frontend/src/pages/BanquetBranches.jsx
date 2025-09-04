import React, { useState } from "react";
import { Link } from "react-router-dom";
import BanquetDetailPopup from "../components/BanquetDetailPopup";

import karachi1 from "../assets/karachi1.jpeg";
import karachi2 from "../assets/karachi2.jpeg";
import karachi3 from "../assets/karachi3.jpeg";
import karachi4 from "../assets/karachi4.jpeg";
import karachi5 from "../assets/karachi5.jpeg";
import karachi6 from "../assets/karachi6.jpg";

import lahore1 from "../assets/lahore1.jpg";
import lahore2 from "../assets/lahore2.png";
import lahore3 from "../assets/lahore3.jpg";

import islamabad1 from "../assets/islamabad1.jpeg";
import islamabad2 from "../assets/islamabad2.jpg";

const BanquetBranches = () => {
  const [selectedCity, setSelectedCity] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBanquet, setSelectedBanquet] = useState(null);

  // Sample data for banquet branches
  const banquetBranches = [
    {
      id: 1,
      name: "Fairmont Banquet",
      city: "Karachi",
      address:
        "E-90, Block 4, Maskan Chowrangi, Gulshan Iqbal, Karachi, Pakistan",
      description:
        "Celebrate your unique stories at Fairmont banquet for weddings and other special gatherings.",
      image: karachi1,
      phone: "+92 321 6576 011",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 2,
      name: "Oasis Banquets",
      city: "Karachi",
      address:
        "D-4, Block L, Near 5 Star Roundabout, North Nazimabad, Karachi, Pakistan 74700",
      description:
        "Capture the beautiful memories of functions with your family and friends at the Oasis Banquets.",
      image: karachi2,
      phone: "+92 321 6576 012",
      rating: 4.3,
      reviews: 85,
    },
    {
      id: 3,
      name: "Roses Banquet",
      city: "Karachi",
      address: "D-3 Block L, North Nazimabad, Karachi, Pakistan 74600",
      description:
        "Luxurious and grand wedding banquet, ideal for every type of party.",
      image: karachi3,
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
      image: karachi4,
      phone: "021-34385022-1",
      rating: 4.4,
      reviews: 95,
    },
    {
      id: 5,
      name: "Himalaya Banquets",
      city: "Karachi",
      address: "Block 4 Gulshan-e-Iqbal, Karachi",
      description:
        "Specializes in creating unforgettable experiences for all of your memorable occasions.",
      image: karachi5,
      phone: "+92 321 6576 013",
      rating: 4.6,
      reviews: 110,
    },
    {
      id: 6,
      name: "Bellagio Banquet",
      city: "Karachi",
      address:
        "C-18 & C19 Main Sharah e Pakistan, Block 6, Federal B Area, Karachi, Pakistan",
      description:
        "Every event should be a reflection of your unique style and personality.",
      image: karachi6,
      phone: "(021) 36425563",
      rating: 4.8,
      reviews: 200,
    },
    {
      id: 7,
      name: "Mehmaan Khana Marriage Hall",
      city: "Lahore",
      address: "Lahore, Pakistan",
      description:
        "THE BEST WEDDING VENUE IN LAHORE with wonderful decor and hygienic food.",
      image: lahore1,
      phone: "+92 321 6576 011",
      rating: 4.5,
      reviews: 180,
    },
    {
      id: 8,
      name: "Grand Pavilion Banquet Hall",
      city: "Lahore",
      address:
        "Golf & Country Club, Hall # 7, Wedding Halls, Garrison, Saddar Town, Lahore, Punjab 54000",
      description:
        "The longest-standing establishments in the Complex with exclusive offerings.",
      image: lahore2,
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
      image: lahore3,
      phone: "+92 321 6576 015",
      rating: 4.9,
      reviews: 165,
    },
    {
      id: 10,
      name: "Majestic Marquee",
      city: "Islamabad",
      address: "2-A Club Rd, Shakar Parlan, Islamabad",
      description:
        "Stands as the most prestigious venue in the twin cities, offering unparalleled elegance.",
      image: islamabad1,
      phone: "+92 321 6576 016",
      rating: 4.7,
      reviews: 220,
    },
    {
      id: 11,
      name: "Marhaba Marquee",
      city: "Islamabad",
      address: "Islamabad, Pakistan",
      description:
        "A breathtaking wedding venue that creates memorable experiences.",
      image: islamabad2,
      phone: "+92 321 6576 017",
      rating: 4.4,
      reviews: 130,
    },
  ];

  // Filter branches based on selected city
  const filteredBranches =
    selectedCity === "all"
      ? banquetBranches
      : banquetBranches.filter((branch) => branch.city === selectedCity);

  const handleViewDetails = (banquet) => {
    setSelectedBanquet(banquet);
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedBanquet(null);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] pt-16">
      {/* Hero Section */}
      <div className="bg-[#800020] text-[#FFF8E7] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Banquet Branches
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover our premium banquet locations across Pakistan, each
            offering exceptional venues for your special events
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#800020] mb-4">
            Filter by City
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCity("all")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCity === "all"
                  ? "bg-[#800020] text-[#FFF8E7]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Cities
            </button>
            <button
              onClick={() => setSelectedCity("Karachi")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCity === "Karachi"
                  ? "bg-[#800020] text-[#FFF8E7]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Karachi
            </button>
            <button
              onClick={() => setSelectedCity("Lahore")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCity === "Lahore"
                  ? "bg-[#800020] text-[#FFF8E7]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Lahore
            </button>
            <button
              onClick={() => setSelectedCity("Islamabad")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCity === "Islamabad"
                  ? "bg-[#800020] text-[#FFF8E7]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Islamabad
            </button>
            <button
              onClick={() => setSelectedCity("Peshawar")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCity === "Peshawar"
                  ? "bg-[#800020] text-[#FFF8E7]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Peshawar
            </button>
          </div>
        </div>

        {/* Results Section */}
        {selectedCity === "Peshawar" ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="bg-[#800020] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#FFF8E7]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#800020] mb-2">
              No Banquets Available in Peshawar
            </h3>
            <p className="text-gray-600 mb-6">
              We currently don't have any banquet branches in Peshawar. Please
              check our locations in other cities.
            </p>
            <button
              onClick={() => setSelectedCity("all")}
              className="bg-[#800020] text-[#FFF8E7] px-6 py-2 rounded-lg font-semibold hover:bg-[#600018] transition"
            >
              View All Branches
            </button>
          </div>
        ) : filteredBranches.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="bg-[#800020] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#FFF8E7]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#800020] mb-2">
              No Branches Found
            </h3>
            <p className="text-gray-600">
              We couldn't find any branches matching your criteria.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-[#800020] mb-6">
              {selectedCity === "all"
                ? "All Branches"
                : `Branches in ${selectedCity}`}
              <span className="text-gray-600 ml-2">
                ({filteredBranches.length})
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBranches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={branch.image}
                      alt={branch.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-[#800020]">
                        {branch.name}
                      </h3>
                      {/* <div className="flex items-center bg-[#800020] text-[#FFF8E7] px-2 py-1 rounded">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span>{branch.rating}</span>
                      </div> */}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      ({branch.reviews} reviews)
                    </p>
                    <p className="text-gray-700 mb-4">{branch.description}</p>
                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <svg
                          className="w-4 h-4 mr-2 text-[#800020]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        {branch.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2 text-[#800020]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                        {branch.phone}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="bg-[#FFEBC1] text-[#800020] px-3 py-1 rounded-full text-sm font-medium">
                        {branch.city}
                      </span>
                      <button
                        onClick={() => handleViewDetails(branch)}
                        className="bg-[#800020] text-[#FFF8E7] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#600018] transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {selectedBanquet && (
        <BanquetDetailPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          banquet={selectedBanquet}
        />
      )}
    </div>
  );
};

export default BanquetBranches;
