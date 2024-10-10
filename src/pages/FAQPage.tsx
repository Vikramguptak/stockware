import React from 'react';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: "How do I book a storage space?",
      answer: "You can book a storage space by searching for available options in your area, selecting the space that meets your needs, and completing the online booking process."
    },
    {
      question: "What types of storage spaces are available?",
      answer: "We offer a variety of storage options including self-storage units, warehouses, and parking spaces. The availability may vary based on your location."
    },
    {
      question: "How long can I rent a storage space?",
      answer: "Rental periods are flexible and can range from short-term (as little as a week) to long-term (several months or years), depending on your needs and the specific space."
    },
    {
      question: "Is my stored property insured?",
      answer: "While we ensure the security of our facilities, we recommend obtaining your own insurance for stored items. Some spaces may offer insurance options, but it's best to check with the specific provider."
    },
    {
      question: "Can I access my storage space at any time?",
      answer: "Access hours may vary depending on the specific storage facility. Many offer 24/7 access, while others may have set operating hours. This information is provided in the space details."
    },
    {
      question: "What if I need to cancel my reservation?",
      answer: "Cancellation policies may vary depending on the space provider. Generally, we offer flexible cancellation options, but please refer to the specific terms provided during the booking process."
    },
    {
      question: "How do I list my own storage space?",
      answer: "You can list your storage space by clicking on the 'List Your Space' button and following the prompts to provide details about your space. Our team will review your listing before it goes live."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;