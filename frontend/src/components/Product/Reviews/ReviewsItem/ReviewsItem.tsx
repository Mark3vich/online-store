import React from 'react';
import { Rate, Typography } from 'antd';
import IReviewItem from '../../../../interfaces/IRevieItem';

interface ReviewsItemProps {
    token?: string;
    review: IReviewItem[];
    renderStars: (rating: number) => React.ReactNode;
};

class ReviewsItem extends React.Component<ReviewsItemProps> {
    render(): React.ReactNode {
        const { review } = this.props;

        return (
            <div>
                <Typography.Title level={2}>Reviews</Typography.Title>
                {review.map((item, index) => (
                    <div key={index} className="d-flex align-items-start gap-3 mb-3">
                        <Typography.Title level={4} className="mb-0">
                            {this.props.renderStars(Number(item.rating))}
                        </Typography.Title>
                        <Typography.Title level={4} className="text-muted mt-1 text-description">{item.review}</Typography.Title>
                    </div>
                ))}
            </div>
        );
    }
}

export default ReviewsItem;
