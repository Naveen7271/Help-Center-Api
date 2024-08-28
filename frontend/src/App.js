import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import SearchBar from './SearchBar';
import RequestModal from './RequestModal';
import './index.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:4000/cards');
        setCards(response.data.cards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const handleAddCard = async (cardData) => {
    try {
      const response = await axios.post('http://localhost:4000/cards', cardData);
      setCards([response.data.note, ...cards]); // Update the list with the new card
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  return (
<div className="scroll-container min-h-screen bg-white flex flex-col ">
<header className="bg-black rounded-t-2xl shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl text-white">Abstract | Help Center</h1>
          <button
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600"
            onClick={() => setIsModalOpen(true)}
          >
            Submit a request
          </button>
        </div>
      </header>
      <main className="flex-grow">
        <div className="mx-auto bg-slate-200 py-6 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-8">How can we help?</h2>
          <div className="max-w-xl mx-auto mb-12">
            <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 mx-auto py-12 w-1/2 md:grid-cols-2 gap-6">
          {cards.filter(card =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.content.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(card => (
            <Card key={card._id} title={card.title} content={card.content} />
          ))}
        </div>
      </main>
      <footer className="bg-black text-white mt-auto rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-9">
            <div className="md:col-span-1">
              <h2 className="font-bold mb-2">Abstract</h2>
              <p>Branches</p>
            </div>
            <div className="md:col-span-1">
              <h3 className="font-bold mb-2">Resources</h3>
              <p>Help Center</p>
              <p>Blog</p>
              <p>Release Notes</p>
              <p>Status</p>
            </div>
            <div className="md:col-span-1">
              <h3 className="font-bold mb-2">Community</h3>
              <p>Twitter</p>
              <p>LinkedIn</p>
              <p>Facebook</p>
              <p>Dribbble</p>
              <p>Podcast</p>
            </div>
            <div className="md:col-span-1">
              <h3 className="font-bold mb-2">Company</h3>
              <p>About Us</p>
              <p>Careers</p>
              <p>Legal</p>
              <p className="mt-4">Contact Us</p>
              <p>info@abstract.com</p>
            </div>
            <div className="md:col-span-1 flex items-end">
              <p className="text-sm w-36">&copy; Copyright 2022 Abstract Studio Design, Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for submitting a request */}
      <RequestModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCard}
      />
    </div>
  );
};

export default App;
