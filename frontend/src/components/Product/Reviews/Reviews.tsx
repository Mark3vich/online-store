import React from 'react';
import { getRating } from '../../../services/RatingService';
import { Rate, Typography, Button } from 'antd';
import IReviewItem from '../../../interfaces/IRevieItem';
import { getReview } from '../../../services/ReviewService';
import ReviewsItem from './ReviewsItem/ReviewsItem';
import OutputComments from './OutputComments/OutputComments';

interface Params {
    id: string;
}

interface Props {
    params: Params;
}

interface AppState {
    rating: string;
    review: IReviewItem[];
    activeTab: 'reviews' | 'comments';
}

class Reviews extends React.Component<Props, AppState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            rating: "",
            review: [],
            activeTab: 'reviews',
        }
    }

    async componentDidMount() {
        const rating = await getRating(this.props.params.id);
        const review = await getReview(this.props.params.id);
        this.setState({ rating, review });
    }

    renderStars(rating: number) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ color: i <= rating ? 'gold' : 'lightgray' }}>
                    ★
                </span>
            );
        }
        return stars;
    }

    setActiveTab = (tab: 'reviews' | 'comments') => {
        this.setState({ activeTab: tab });
    };

    render() {
        const { rating, review, activeTab } = this.state;
        return (
            <div>
                <div className="d-flex align-items-center gap-3">
                    <Typography.Title level={4} className="mb-0 title-text">
                        Average Rating:
                    </Typography.Title>
                    <Rate value={Number(rating)} disabled allowHalf style={{ fontSize: '32px' }} />
                </div>
                <div className="mb-4">
                    <Button
                        type={activeTab === 'reviews' ? 'primary' : 'default'}
                        onClick={() => this.setActiveTab('reviews')}
                        style={{ marginRight: '8px' }}
                    >
                        Reviews
                    </Button>
                    <Button
                        type={activeTab === 'comments' ? 'primary' : 'default'}
                        onClick={() => this.setActiveTab('comments')}
                    >
                        Comments
                    </Button>
                    {activeTab === 'reviews' ? (
                        <ReviewsItem review={review} renderStars={this.renderStars} />
                    ) : (
                        <OutputComments id={this.props.params.id} token={localStorage.getItem('token') || ''} />
                    )}
                </div>
            </div>
        );
    }
}

export default Reviews;