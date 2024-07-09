import React from 'react';
import { Category } from '../../data/models/Category';

interface Props {
    categories: Category[];
}

const BestCategories: React.FC<Props> = ({ categories }) => (
    <div className="best-categories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-8">
        {categories.map(category => (
            <div key={category.id} className="category-card p-6 bg-white shadow-lg rounded-lg transform transition hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-2">{category.categoryName}</h3>
                <p className="text-gray-700">{category.description}</p>
            </div>
        ))}
    </div>
);

export default BestCategories;
