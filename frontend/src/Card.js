import React from 'react';

const Card = ({ title, content }) => (
  <div className="bg-slate-50 p-3 w-full h-32  rounded-lg shadow-md">
    <h3 className="text-lg font-semibold">{title}</h3>
    <hr />
    <p className="text-slate-600">{content}</p>
  </div>
);

export default Card;