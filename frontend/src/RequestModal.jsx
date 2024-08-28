import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility

const RequestModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    onRequestClose(); // Close the modal after submission
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Submit a Request"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-2xl mb-4">Submit a Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 p-2 block w-full border rounded"
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          <button type="button" onClick={onRequestClose} className="ml-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default RequestModal;
