import React from 'react';

interface AppBreadcrumbItem {
    label: string;
    href?: string;
}

interface AppBreadcrumbProps {
    items: AppBreadcrumbItem[];
}

const AppBreadcrumb: React.FC<AppBreadcrumbProps> = ({ items }) => {
    return (
        <nav className="flex py-3 text-gray-700" aria-label="AppBreadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {item.href ? (
                            <a href={item.href} className="inline-flex text-gray-700 hover:text-gray-900">
                                {index !== 0 && (
                                    <svg
                                        className="w-6 h-6 text-gray-400 mx-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 15.293a1 1 0 010-1.414L13.586 10 10.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                                <span className=' hover:text-meta-5'>

                                    {item.label}
                                </span>
                            </a>
                        ) : (
                            <span className="text-gray-500">
                                {index !== 0 && (
                                    <svg
                                        className="w-6 h-6 text-gray-400 mx-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 15.293a1 1 0 010-1.414L13.586 10 10.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default AppBreadcrumb;
