import React from 'react';

interface Props {
    stats: {
        numberOfEnrollments: number;
        certificationsMade: number;
        satisfactionRate: number;
    };
}

const Statistics: React.FC<Props> = ({ stats }) => (
    <div style={{ paddingTop: 50 }}>
        <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">Statistics</h2>
        <div className="statistics grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-8 px-4 md:px-8">
            <div className="stat-item p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg rounded-lg transform transition hover:scale-105">
                <h3 className="text-5xl font-extrabold">{stats.numberOfEnrollments}</h3>
                <p className="mt-2 text-lg">Enrollments</p>
            </div>
            <div className="stat-item p-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg rounded-lg transform transition hover:scale-105">
                <h3 className="text-5xl font-extrabold">1000+</h3>
                <p className="mt-2 text-lg">Certifications Made</p>
            </div>
            <div className="stat-item p-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg rounded-lg transform transition hover:scale-105">
                <h3 className="text-5xl font-extrabold">90%</h3>
                <p className="mt-2 text-lg">Satisfaction Rate</p>
            </div>
        </div>
    </div>
);

export default Statistics;
