import React from 'react';
import { Button, Input, notification, Typography } from 'antd';
import IReviewItem from '../../../../interfaces/IRevieItem';
import { checkToken, getUser } from '../../../../services/TokenService';
import { deleteReview, updateReview } from '../../../../services/ReviewService';

interface ReviewsItemProps {
  product_id: string;
  review: IReviewItem[];
  renderStars: (rating: number) => React.ReactNode;
};

interface ReviewsItemState {
  token: string;
  user_id: number | null;
  editingReviewId: string | null;
  editedReviewText: string;
  editedReviewRating: number;
}

class ReviewsItem extends React.Component<ReviewsItemProps, ReviewsItemState> {
  constructor(props: ReviewsItemProps) {
    super(props);

    this.state = {
      token: '',
      user_id: null,
      editingReviewId: null,
      editedReviewText: '',
      editedReviewRating: 0,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const user_id = (await getUser()).id;
    if (token) {
      const isFlag: boolean = await checkToken();
      if (isFlag) {
        this.setState({ token, user_id });
      }
    }
  }

  // Обработчик для удаления отзыва
  handleDelete = async (reviewId: string) => {
    const { token } = this.state;
    const { product_id } = this.props;
    if (!token) {
      console.error("Token is not valid");
      notification.error({
        message: 'Ошибка',
        description: 'Токен недействителен.',
      });
      return;
    }

    try {
      await deleteReview(product_id, token, reviewId);
      notification.success({
        message: 'Успех',
        description: `Отзыв успешно удалён.`,
      });
      // Обновляем состояние или заново загружаем список отзывов
    } catch (error) {
      console.error("Error deleting review:", error);
      notification.error({
        message: 'Ошибка',
        description: 'Произошла ошибка при удалении отзыва.',
      });
    }
  };

  // Обработчик для редактирования отзыва
  handleEdit = (item: IReviewItem) => {
    this.setState({
      editingReviewId: String(item.id),
      editedReviewText: item.review,
      editedReviewRating: item.rating,
    });
  };

  handleSave = async (reviewId: string) => {
    const { token, editedReviewText, editedReviewRating } = this.state;
    const { product_id } = this.props;

    if (!token) {
      notification.error({
        message: 'Ошибка',
        description: 'Токен недействителен.',
      });
      return;
    }

    try {
      await updateReview(product_id, token, {
        id: Number(reviewId),
        review: editedReviewText,
        rating: editedReviewRating,
      });
      notification.success({
        message: 'Успех',
        description: `Отзыв успешно обновлен.`,
      });
      this.setState({ editingReviewId: null });
    } catch (error) {
      console.error("Error updating review:", error);
      notification.error({
        message: 'Ошибка',
        description: `Произошла ошибка при обновлении отзыва.`,
      });
    }
  };

  handleCancel = () => {
    this.setState({ editingReviewId: null });
  };

  handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ editedReviewText: event.target.value });
  };

  handleChangeRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ editedReviewRating: Number(event.target.value) });
  };
  // await updateReview(product_id, token, review);
  render(): React.ReactNode {
    const { review, renderStars } = this.props;
    const { token, user_id, editingReviewId, editedReviewText, editedReviewRating } = this.state;

    return (
      <div>
        <Typography.Title level={2}>Reviews</Typography.Title>
        {review.map((item: IReviewItem) => (
          <div key={item.id} className="d-flex align-items-start gap-3 mb-3">
            {editingReviewId === String(item.id) ? (
              <div>
                {/* Поля для редактирования */}
                <Input
                  value={editedReviewText}
                  onChange={this.handleChangeText}
                  className="mb-2"
                />
                <Input
                  type="number"
                  value={editedReviewRating}
                  onChange={this.handleChangeRating}
                  min={1}
                  max={5}
                  className="mb-2"
                />
                <Button type="primary" onClick={() => this.handleSave(String(item.id))}>
                  Сохранить
                </Button>
                <Button type="default" onClick={this.handleCancel} className="ml-2">
                  Отмена
                </Button>
              </div>
            ) : (
              <div className="d-flex align-items-start gap-3">
                <Typography.Title level={4} className="mb-0">
                  {renderStars(Number(item.rating))}
                </Typography.Title>
                <Typography.Text className="text-muted mt-1 text-description">
                  {item.review}
                </Typography.Text>
              </div>
            )}

            {/* Если токен валиден и отзыв принадлежит пользователю, отображаем кнопки */}
            {token && user_id === item.user_id && editingReviewId !== String(item.id) && (
              <div className="ml-auto">
                <Button type="primary" onClick={() => this.handleEdit(item)} className="me-2">
                  Изменить
                </Button>
                <Button type="default" danger onClick={() => this.handleDelete(String(item.id))}>
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
