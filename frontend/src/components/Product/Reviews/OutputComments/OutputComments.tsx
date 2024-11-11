import React from 'react';
import { Typography, Button, Input, message, Rate } from 'antd';
import IReview from '../../../../interfaces/IReview';
import { postReview } from '../../../../services/ReviewService';

const { TextArea } = Input;

type OutputCommentsProps = {
    id: string;
    token: string;
};

interface OutputCommentsState {
    review: string;
    rating: number;
    loading: boolean;
}

class OutputComments extends React.Component<OutputCommentsProps, OutputCommentsState> {
    constructor(props: OutputCommentsProps) {
        super(props);
        this.state = {
            review: '',
            rating: 5, // По умолчанию рейтинг 5
            loading: false,
        };
    }

    // Обработчик изменения текста в TextArea
    handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ review: event.target.value });
    };

    // Обработчик изменения рейтинга
    handleRatingChange = (value: number) => {
        this.setState({ rating: value });
    };

    // Функция для отправки комментария
    postReviewHandler = async () => {
        const { id, token } = this.props;
        const { review, rating } = this.state;

        if (!review.trim()) {
            message.warning("Comment cannot be empty");
            return;
        }

        this.setState({ loading: true });

        try {
            const newReview: IReview = { review, rating };
            const response = await postReview(id, token, newReview);

            message.success("Comment added successfully!");

            // Очистка полей после успешной отправки
            this.setState({ review: '', rating: 5 });
        } catch (error) {
            console.error("Error posting review:", error);
            message.error("Failed to add comment");
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { review, rating, loading } = this.state;

        return (
            <div>
                <Typography.Title level={2}>Comments</Typography.Title>
                <TextArea
                    rows={4}
                    value={review}
                    onChange={this.handleInputChange}
                    placeholder="Write your comment here..."
                    maxLength={500}
                    style={{ marginBottom: '16px' }}
                />
                <div style={{ marginBottom: '16px' }}>
                    <Typography.Text>Rating: </Typography.Text>
                    <Rate value={rating} onChange={this.handleRatingChange} />
                </div>
                <Button
                    type="primary"
                    onClick={this.postReviewHandler}
                    loading={loading}
                    disabled={!review.trim()}
                >
                    Submit Comment
                </Button>
            </div>
        );
    }
}

export default OutputComments;
