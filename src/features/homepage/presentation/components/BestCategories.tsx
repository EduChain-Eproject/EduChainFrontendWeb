import React from 'react';
import Category from '../../../../common/entities/Category';

interface Props {
  categories: Category[];
}

const BestCategories: React.FC<Props> = ({ categories }) => {
  const colors = [
    'bg-red-500', 
    'bg-green-500', 
    'bg-blue-500', 
    'bg-yellow-500', 
    'bg-purple-500', 
    'bg-pink-500', 
    'bg-indigo-500',
    'bg-teal-500'
  ];

  return (
    <div>
    <h2 className="text-center my-16 text-4xl font-bold">
        Categories
      </h2>

    <div className="best-categories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-8">
      {categories.map((category, index) => (
        <div
          key={category.id}
          className={`category-card p-6 shadow-lg rounded-lg transform transition hover:-translate-y-1 ${colors[index % colors.length]} text-white`}
        >
          <h3 className="text-xl font-bold mb-2">{category.categoryName}</h3>
          <p className="text-white opacity-90">{category.categoryDescription}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default BestCategories;
