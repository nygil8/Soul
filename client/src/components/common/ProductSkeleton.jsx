import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = ({ count = 4 }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array(count).fill(0).map((_, i) => (
                <div key={i} className="text-center">
                    {/* Image Skeleton */}
                    <div className="mb-4 rounded-xl overflow-hidden">
                        <Skeleton height={256} className="w-full" />
                    </div>
                    {/* Text Skeleton */}
                    <Skeleton width="80%" height={24} className="mb-2" />
                    <Skeleton width="40%" height={20} />
                </div>
            ))}
        </div>
    );
};

export default ProductSkeleton;
