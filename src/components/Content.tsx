import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { useNavigate } from "react-router-dom";
import fetchContent from "../utils/fetchContent";
import { steps } from "../constants/learningSteps/steps";
import { LearnContentProps } from "../types/components/Content.types";
import "highlight.js/styles/github.css";

const LearnContent: React.FC<LearnContentProps> = ({ file }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const contentData = await fetchContent(file);
        setContent(contentData);
        setError(null);
      } catch (err) {
        setError("Failed to load content");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [file]);

  const currentIndex = steps.findIndex((step) =>
    step.link.includes(file.split(".")[0])
  );

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1].link);
    }
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1].link);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-1 min-h-screen">
        <div className="animate-spin text-4xl text-teal-500">
          <svg
            className="w-12 h-12 text-teal-500"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      {content && (
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            img: ({ ...props }) => (
              <div className="flex justify-center my-4">
                <img
                  {...props}
                  alt={props.alt || ""}
                  className="max-w-full h-auto rounded"
                />
              </div>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 ${
            currentIndex === 0 ? "cursor-not-allowed" : "hover:bg-gray-400"
          }`}
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
          className={`px-4 py-2 bg-teal-500 text-white rounded ${
            currentIndex === steps.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-teal-600"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default LearnContent;
