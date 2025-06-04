import React, { useState } from 'react';

const faqs = [
  {
    question: "How can I join an event?",
    answer:
      "Simply register or log in to your account, browse the events page, and click 'Join' on any event you'd like to participate in.",
  },
  {
    question: "Is HobbyHub free to use?",
    answer:
      "Yes! You can explore events and connect with others for free. Some events may require a fee set by organizers.",
  },
  {
    question: "Can I create my own hobby group?",
    answer:
      "Absolutely! After signing up, go to the 'Create Group' section and fill in the necessary details to start your own group.",
  },
  {
    question: "Is there any mobile app available?",
    answer:
      "Currently, we are working on the mobile version. Stay tuned for updates via our newsletter or social media!",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log({ name, comment });
    setSubmitted(true);
    setName('');
    setComment('');
  };

  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  <span className="text-gray-500 text-xl">
                    {activeIndex === index ? '-' : '+'}
                  </span>
                </div>
              </button>
              {activeIndex === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Comment Box */}
        <div className="mt-16 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Leave a Comment</h3>
          {submitted && (
            <div className="mb-4 text-green-600 font-medium">Thanks for your comment!</div>
          )}
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Your Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
