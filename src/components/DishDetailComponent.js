import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem, Nav, NavItem, Button,
    Modal, ModalHeader, ModalBody, Row, Col, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const RenderDish = ({ dish }) => {
    if (dish != null) {
        return (
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else {
        return (
            <div></div>
        );
    }
}

function RenderComments({ comments, postComment, dishId }) {

    const comment = comments.map((comment) => {
        return (
            <li className={'mb-2'}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
            </li>
        );
    });

    if (comments != null) {
        return (
            <div>
                <ul key={comment.id} className={'list-unstyled'}>
                    {comment}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        )
    } else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments </h4>
                        <RenderComments comments={props.comments} dishId={props.dish.id} postComment={props.postComment} />
                    </div>
                </div>
            </div>
        );
    }
}

class CommentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: '',
            fullName: '',
            comment: '',
            touched: {
                rating: false,
                fullName: false,
                comment: false

            },
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.yourName, values.comment);
        // event.preventDefault();
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <div>
                <Nav className="ml-auto navbar">
                    <NavItem>
                        <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment </Button>
                    </NavItem>
                </Nav>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".select" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourName" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourName" id="yourName" name="yourName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".yourName"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="10"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10 }}>
                                    <Button type="submit" color="primary" >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}

export default DishDetail;