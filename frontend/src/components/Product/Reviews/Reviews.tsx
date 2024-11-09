import React from 'react';

class Reviews extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            reviews: []
        }
    }

    componentDidMount() {
        fetch(`/api/reviews/${this.props.id}`)
            .then(response => response.json())
            .then(data => this.setState({ reviews: data }));
    }

    render() {
        const { reviews } = this.state;
        return (
            <div>
                <h2>Reviews</h2>
                {reviews.map((review: any) => (
                    <div key={review.id}>
                        <p>{review.text}</p>
                        <p>{review.rating}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Reviews;