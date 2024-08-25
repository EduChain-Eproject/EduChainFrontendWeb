import React from 'react';
import { Blog } from '../../../../common/entities/Blog';

interface Props {
  blogs: Blog[];
}

const Blogs: React.FC<Props> = ({ blogs }) => (
  <div className="blogs py-8">
    <h2 className="text-3xl font-bold mb-4 text-center">Blogs</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="blog-card p-6 bg-white shadow-lg rounded-lg transform transition hover:-translate-y-1"
        >
          <div className="flex items-center mb-4">
            <img
              src={blog.user.avatarPath}
              alt={`${blog.user.firstName} ${blog.user.lastName}`}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-gray-700 font-semibold">{blog.user.firstName} {blog.user.lastName}</p>
            </div>
          </div>
          <h3 className="text-2xl mb-2">{blog.title}</h3>
          <p className="text-gray-700 line-clamp-3">{blog.blogText}</p>
        </div>
      ))}
    </div>
  </div>
);


export default Blogs;
