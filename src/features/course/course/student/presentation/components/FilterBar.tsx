import React from 'react';
import Category from '../../domain/entities/Category';


interface FilterBarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    size: number;
    setSize: React.Dispatch<React.SetStateAction<number>>;
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    categories?: Category[];
    selectedCategoryIds: number[];
    setSelectedCategoryIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const FilterBar: React.FC<FilterBarProps> = ({
    search,
    setSearch,
    setPage,
    size,
    setSize,
    sortBy,
    setSortBy,
    categories,
    selectedCategoryIds,
    setSelectedCategoryIds,
}) => {

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(0); // Reset page to 0 when search changes
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSize(parseInt(e.target.value));
        setPage(0); // Reset page to 0 when size changes
    };

    const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: number) => {
        if (e.target.checked) {
            setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
        } else {
            setSelectedCategoryIds(selectedCategoryIds.filter(id => id !== categoryId));
        }
        setPage(0); // Reset page to 0 when categories change
    };

    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="px-2 py-1 border rounded-md"
                />
                <select
                    value={size}
                    onChange={handleSizeChange}
                    className="px-2 py-1 border rounded-md"
                >
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                    <option value="50">50 per page</option>
                </select>
                <select
                    value={sortBy}
                    onChange={handleSortByChange}
                    className="px-2 py-1 border rounded-md"
                >
                    <option value="title">Sort by Title</option>
                    <option value="price">Sort by price</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <div className="flex space-x-2">
                {categories?.map(category => (
                    <label key={category.id} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedCategoryIds.includes(category.id)}
                            onChange={(e) => handleCategoryChange(e, category.id)}
                            className="mr-1"
                        />
                        {category.categoryName}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
