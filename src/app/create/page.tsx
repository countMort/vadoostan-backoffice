"use client"
import { useState } from "react";

export default function ExperienceForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    faqs: [{ question: "", answer: "" }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFaqChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index][name] = value;

    setFormData((prev) => ({
      ...prev,
      faqs: updatedFaqs,
    }));
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index) => {
    if (formData.faqs.length <= 1) return;

    const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      faqs: updatedFaqs,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send formData to your backend
    console.log("Form submitted:", formData);
    alert("Experience submitted successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Experience</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8"
      >
        {/* Title Field */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Experience title"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Detailed description of the experience"
            required
          />
        </div>

        {/* FAQs Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">FAQs</h2>
            <button
              type="button"
              onClick={addFaq}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Add FAQ
            </button>
          </div>

          {formData.faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-6 p-4 border border-gray-200 rounded-md relative"
            >
              {formData.faqs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  aria-label="Remove FAQ"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              <div className="mb-4">
                <label
                  htmlFor={`question-${index}`}
                  className="block text-gray-700 font-medium mb-2"
                >
                  Question #{index + 1}
                </label>
                <input
                  type="text"
                  id={`question-${index}`}
                  name="question"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter question"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor={`answer-${index}`}
                  className="block text-gray-700 font-medium mb-2"
                >
                  Answer #{index + 1}
                </label>
                <textarea
                  id={`answer-${index}`}
                  name="answer"
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(index, e)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter answer"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Experience
        </button>
      </form>
    </div>
  );
}
