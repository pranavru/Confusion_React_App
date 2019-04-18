import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle,
    Media
} from 'reactstrap';


class DishDetail extends Component {

    renderDish(dish) {
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(comments) {
        if (comments != null) {
            return comments.map((comment) => {
                return (
                    <ul key={comment.id} className={'list-unstyled'}>
                        <li className={'mb-2'}>
                            {comment.comment}
                        </li>
                        <li>
                            -- {comment.author} {comment.date}
                        </li>
                    </ul >
                );
            })
        } else {
            return (
                <div></div>
            );
        }
    }

    render() {
        return (
            <div className="row">
                <div className='col-12 col-md-5 m-1'>
                    {this.renderDish(this.props.dish1)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {this.renderComments(this.props.dish1.comments)}
                </div>
            </div>
        );
    }
}

export default DishDetail;