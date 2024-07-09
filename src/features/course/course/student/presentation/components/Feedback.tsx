import React from 'react';
import CourseFeedback from '../../domain/entities/CourseFeedback';

interface FeedbackProps {
    feedbacks?: CourseFeedback[];
}

const Feedback: React.FC<FeedbackProps> = ({ feedbacks }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Feedback</h2>
            {feedbacks && feedbacks.length > 0 ? (
                <ul>
                    {feedbacks.map(feedback => (
                        <li key={feedback.id}>
                            <p>
                                {/* <strong>{feedback.user.name}:</strong> */}
                                {feedback.message}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No feedback available.</p>
            )}
        </div>
    );
};

export default Feedback;
