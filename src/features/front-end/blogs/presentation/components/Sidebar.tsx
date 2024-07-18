import React from 'react';

export const Sidebar: React.FC = () => {
    const otherPosts = [
        { id: 1, title: 'Post 1', excerpt: 'This is an excerpt of post 1' },
        { id: 2, title: 'Post 2', excerpt: 'This is an excerpt of post 2' },
        { id: 3, title: 'Post 3', excerpt: 'This is an excerpt of post 3' },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Other Posts</h3>
            <ul>
                {otherPosts.map(post => (
                    <li key={post.id} className="mb-4">
                        <h4 className="text-lg font-semibold">{post.title}</h4>
                        <p className="text-gray-600">{post.excerpt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

