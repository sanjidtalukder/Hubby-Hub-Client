import React, { useState } from 'react';

const faqs = [
  {
    question: "How can I join an event?",
    answer: "Simply register or log in to your account, browse the events page, and click 'Join' on any event you'd like to participate in.",
  },
  {
    question: "Is HobbyHub free to use?",
    answer: "Yes! You can explore events and connect with others for free. Some events may require a fee set by organizers.",
  },
  {
    question: "Can I create my own hobby group?",
    answer: "Absolutely! After signing up, go to the 'Create Group' section and fill in the necessary details to start your own group.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 px-6" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer shadow-sm hover:shadow-md transition"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">{faq.question}</h3>
                <span className="text-gray-500 text-xl">
                  {activeIndex === index ? '-' : '+'}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
