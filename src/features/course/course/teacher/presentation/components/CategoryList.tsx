import React from 'react';
import Category from '../../../../../../common/entities/Category';

interface CategoryListProps {
  categories: Category[] | undefined;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="mt-4 max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-2">Categories</h3>
      <ul className="flex flex-wrap gap-2">
        {categories &&
          categories.map((category) => (
            <li
              key={category.id}
              className="text-blue-700 font-medium text-sm bg-gray-100 px-2 py-1 rounded"
            >
              {category.categoryName}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryList;