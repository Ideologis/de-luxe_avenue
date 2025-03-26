import React from "react";
import { useAppSelector } from "@/store/hook";
import { selectFeedbacks } from "@/store/features/feedbackSlice";

// Define the Feedback type
interface Feedback {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const FeedbackDisplay: React.FC = () => {
  const feedbacks = useAppSelector(selectFeedbacks);

  if (feedbacks.length === 0) {
    return (
      <div className="my-8 p-6 bg-gray-50 rounded-lg shadow-sm">
        <p className="text-center text-gray-500">No customer feedback yet.</p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
        Customer Feedback
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback: Feedback) => (
          <div
            key={feedback.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-xl text-gray-800">
                {feedback.name}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date(feedback.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 text-base">{feedback.message}</p>
            <div className="flex items-center mt-4">
              {/* Example star rating */}
              {/* <span className="text-yellow-500">★★★★☆</span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackDisplay;
