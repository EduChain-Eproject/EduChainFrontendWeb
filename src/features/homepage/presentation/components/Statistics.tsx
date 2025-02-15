import React from 'react';

interface Props {
    stats: {
        numberOfEnrollments: number;
        certificationsMade: number;
        satisfactionRate: number;
    };
}

const Statistics: React.FC<Props> = ({ stats }) => (
    <div className="statistics grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-8">
        <div className="stat-item p-6 bg-white shadow-lg rounded-lg transform transition hover:-translate-y-1">
            <h3 className="text-4xl font-bold">{stats.numberOfEnrollments}</h3>
            <p className="text-gray-700">Enrollments</p>
        </div>
        <div className="stat-item p-6 bg-white shadow-lg rounded-lg transform transition hover:-translate-y-1">
            <h3 className="text-4xl font-bold">{stats.certificationsMade}</h3>
            <p className="text-gray-700">Certifications Made</p>
        </div>
        <div className="stat-item p-6 bg-white shadow-lg rounded-lg transform transition hover:-translate-y-1">
            <h3 className="text-4xl font-bold">{stats.satisfactionRate}%</h3>
            <p className="text-gray-700">Satisfaction Rate</p>
        </div>
    </div>
);

export default Statistics;
