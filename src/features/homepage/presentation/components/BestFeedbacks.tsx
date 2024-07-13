import React from 'react';
import { Feedback } from '../../domain/models/Feedback';

interface Props {
    feedbacks: Feedback[];
}

const BestFeedbacks: React.FC<Props> = ({ feedbacks }) => (
    <div className="best-feedbacks py-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Student Feedback</h2>
        <div className="feedback-list grid grid-cols-1 md:grid-cols-2 gap-8">
            {feedbacks.map(feedback => (
                <div key={feedback.id} className="feedback-card p-6 bg-white shadow-lg rounded-lg transform transition hover:-translate-y-1">
                    <p className="text-gray-700 mb-2">{feedback.comment}</p>
                    <span className="text-gray-500">- {feedback.studentName}</span>
                </div>
            ))}
        </div>
    </div>
);

export default BestFeedbacks;
