"use client";

import Form, { Textarea, TextInput } from "@/components/Form";

const defaultValues = {
  title: null,
  description: null,
  categoryId: null,
  faqs: [],
  sessions: [
    {
      time: null,
      describtion: null,
      duration: null,
      price: null,
    },
  ],
};

const MyForm = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };

  const addFaq = () => {
    console.log("faq");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Experience</h1>
      <Form onSubmit={handleSubmit} defaultValues={defaultValues}>
        <TextInput label="Title" name="title" placeholder="Experience title" />
        <Textarea
          label="Description"
          name="description"
          placeholder="Detailed description of the experience"
        ></Textarea>
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

                <TextInput
                  name="question"
                  label={`Question #${index + 1}`}
                  placeholder="Enter question"
                  className="mb-4"
                />
              <div>
                <Textarea name="answer" label={`Answer #${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </Form>
    </div>
  );
};

export default MyForm;
