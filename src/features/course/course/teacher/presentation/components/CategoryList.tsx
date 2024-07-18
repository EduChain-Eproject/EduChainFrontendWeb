import React from 'react';
import Category from '../../../../../../common/entities/Category';

interface CategoryListProps {
  categories: Category[] | undefined;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold">Categories</h3>
      <ul className="border p-2 mt-2">
        {categories &&
          categories.map((category) => (
            <li
              key={category.id}
              className="text-gray-700 border-b last:border-b-0 py-1"
            >
              {category.categoryName}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryList;
