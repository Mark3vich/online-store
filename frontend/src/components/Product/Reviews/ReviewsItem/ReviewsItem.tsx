import React from 'react';
import { Button,Typography } from 'antd';
import IReviewItem from '../../../../interfaces/IRevieItem';
import { checkToken } from '../../../../services/TokenService';

interface ReviewsItemProps {
    review: IReviewItem[];
    renderStars: (rating: number) => React.ReactNode;
};

interface ReviewsItemState {
    token: string;
  }
  
  class ReviewsItem extends React.Component<ReviewsItemProps, ReviewsItemState> {
    constructor(props: ReviewsItemProps) {
      super(props);
  
      this.state = {
        token: '',
      };
    }
  
    async componentDidMount() {
      const token = localStorage.getItem('token');
      if (token) {
        const isFlag: boolean = await checkToken();
        if (isFlag) {
          this.setState({ token });
        }
      }
    }
  
    // Обработчик для удаления
    handleDelete = (index: number) => {
      console.log(`Удалить отзыв с индексом: ${index}`);
      // TODO: Реализовать логику удаления отзыва
    };
  
    // Обработчик для редактирования
    handleEdit = (index: number) => {
      console.log(`Редактировать отзыв с индексом: ${index}`);
      // TODO: Реализовать логику редактирования отзыва
    };
  
    render(): React.ReactNode {
      const { review, renderStars } = this.props;
      const { token } = this.state;
  
      return (
        <div>
          <Typography.Title level={2}>Reviews</Typography.Title>
          {review.map((item, index) => (
            <div key={index} className="d-flex align-items-start gap-3 mb-3">
              <Typography.Title level={4} className="mb-0">
                {renderStars(Number(item.rating))}
              </Typography.Title>
              <Typography.Title level={4} className="text-muted mt-1 text-description">
                {item.review}
              </Typography.Title>
              
              {/* Если токен валиден, отображаем кнопки */}
              {token && (
                <div className="ml-auto">
                  <Button type="primary" onClick={() => this.handleEdit(item.id)} className="me-2">
                    Изменить
                  </Button>
                  <Button type="default" danger onClick={() => this.handleDelete(item.id)}>
                    Удалить
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
  }

export default ReviewsItem;
