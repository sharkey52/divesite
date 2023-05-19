import React from 'react';

const FAQ = () => {
  const faqData = [
    {
      question: 'How do I create a new dive log?',
      answer: 'To create a new dive log, navigate to the Dive Log section and click on the "Add Dive" button. Fill in the required information such as date, time, location, depth, and duration of the dive, and save the log.',
    },
    {
      question: 'Can I import dives from other software?',
      answer: 'Yes, you can import dives from other software. Go to the Import section and follow the instructions to upload your dive data in a compatible format.',
    },
    {
      question: 'How can I track my diving statistics?',
      answer: 'In the Statistics section, you can view various diving statistics such as total number of dives, average depth, longest dive, and more. These statistics are automatically calculated based on your logged dives.',
    },
    // Add more FAQ items as needed
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

