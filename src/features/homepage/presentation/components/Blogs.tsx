import React from 'react';
import { Blog } from '../../../../common/entities/Blog';

interface Props {
  blogs: Blog[];
}

const Blogs: React.FC<Props> = ({ blogs }) => (
  <div className="blogs py-8 px-4 md:px-8">
    <h2 className="text-3xl font-bold mb-8 text-center text-purple-600">Blogs</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="blog-card p-6 bg-white shadow-lg rounded-lg transform transition hover:scale-105 hover:shadow-2xl"
        >
          <div className="flex items-center mb-4">
            <img
              src={blog.user.avatarPath}
              alt={`${blog.user.firstName} ${blog.user.lastName}`}
              className="w-16 h-16 rounded-full border-4 border-purple-500 mr-4"
            />
            <div>
              <p className="text-gray-800 font-semibold">{blog.user.firstName} {blog.user.lastName}</p>
              <p className="text-gray-500 text-sm">{blog.user.email}</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-purple-700">{blog.title}</h3>
          <p className="text-gray-700 line-clamp-3">{blog.blogText}</p>
          <a href={`/blogs/${blog.id}`} className="mt-4 text-blue-500 hover:underline">Read more</a>
        </div>
      ))}
    </div>
  </div>
);

export default Blogs;
