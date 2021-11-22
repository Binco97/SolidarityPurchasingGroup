import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import {ListGroup, Table, Button, Row, Col, Modal, Form, Dropdown, Image, Alert} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {AddClientForm} from "../ClientList/AddClient";
import {Client} from "../Client";
import './FarmerHome.css'
import ima from '../ProductImages/p1-1.jpg'
import API from "../../API";

function FarmerHome() {

    const [show, setShow] = useState(false);
    const [showSell, setShowSell] = useState(false);
    const [edit, setEdit] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [productToEdit, setProductToEdit] = useState();
    let prod = [];
    let prodSell = [];
    const [products, setProducts] = useState([]);
    const [productsSell, setProductsSell] = useState([]);


    useEffect(() => {
        let mounted = true;

        const getProdFarmer = async () => {
            prod = await API.getProdFarmer(4, 0);
            prodSell = await API.getProdFarmer(4, 1);
        };
        getProdFarmer().then(data => {
            if (mounted) {
                setProducts(prod);
                setProductsSell(prodSell);
                console.log(prod);
                setConfirm(true);
            }
        })
            .catch(err => {
                console.error(err);
            });
        return () => {
            mounted = false
        };
    }, [confirm]);




    const handleClose = () => {
        setShow(false);
    }

    const handleCloseEdit = () => {
        setEdit(false);
    }


        return (

            <>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>New product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddProductForm handleClose={handleClose}/>

                    </Modal.Body>
                </Modal>


                <Modal show={edit} onHide={handleCloseEdit} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditProductForm productToEdit={productToEdit} handleCloseEdit={handleCloseEdit}/>

                    </Modal.Body>

                </Modal>


                <ListGroup className="prodL">
                    {products.map((x) => (


                            <ListGroup.Item>
                                <Row>
                                    <Col md="2">
                                        <img className="ima"
                                             src={require('../ProductImages/' + "p" + x.Id.toString() + "-1.jpg").default}/>
                                    </Col>
                                    <Col md="2"><h4 className="textP">{x.Name}</h4></Col>
                                    <Col md="2"><h4 className="textP">QTY:{x.Quantity}</h4></Col>
                                    <Col md="2"><h6 className="toConf" color="red">to confirm</h6></Col>
                                    <Col md="2"><Button className="buttonEdit" variant="secondary" onClick={() => {
                                        setEdit(true);
                                        setProductToEdit(x);
                                    }
                                    }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path
                                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                        </svg>
                                        Edit Product</Button></Col>
                                    <Col md="2"><Button className="buttonConfirm" variant="success" onClick={() => {
                                        API.updateProductState(1, x.Id).catch(err => console.log(err));
                                        setConfirm(false);


                                    }}>Confirm</Button></Col>

                                </Row>
                            </ListGroup.Item>
                        )
                    )}
                </ListGroup>


                <Alert variant="success">

                    {showSell ? (

                        <ListGroup className="prodL">
                            {productsSell.map((x) => (
                                    <Row>
                                        <Col md="2">
                                            <img className="ima"
                                                 src={require('../ProductImages/' + "p" + x.Id.toString() + "-1.jpg").default}/>
                                        </Col>
                                        <Col md="2"><h4 className="textP">{x.Name}</h4></Col>
                                        <Col md="2"><h4 className="textP">QTY:{x.Quantity}</h4></Col>
                                        <Col md="2"><h6 className="Conf">confirmed</h6></Col>

                                        <hr className="rowDiv"/>
                                    </Row>

                                )
                            )}

                            <Button className="closeSell" onClick={() => setShowSell(false)} variant="outline-success">
                                Close Selling products
                            </Button>

                        </ListGroup>


                    ) : (


                        <Button className="butSelling" onClick={() => setShowSell(true)} variant="outline-success">
                            See Selling products
                        </Button>
                    )

                    }

                </Alert>
                <Button className="addP" variant="primary" onClick={() => setShow(true)}>Add product</Button>
            </>

        )


}



function AddProductForm(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [typeName, setTypeName] = useState('Select product type');

    const handleAdd = (event) => {
        event.preventDefault();

        API.addProduct(4, name, description,quantity,0,1,pricePerUnit);
        props.handleClose();

        /*let valid = true;
        if (name === '') {
            setErrorMessage('Missing name description!');
            valid = false;
        }
        if (description === '') {
            setErrorMessage('Missing surname description!');
            valid = false;
        }
        if (quantity === '') {
            setErrorMessage('Missing password description!');
            valid = false;
        }
        if (type === '') {
            setErrorMessage('Missing email description!');
            valid = false;
        }
        if (pricePerUnit === '') {
            setErrorMessage('Missing phoneNumber description!');
            valid = false;
        }



        if (valid) {
            //props.addClient(new Client(name, surname, email, password, phoneNumber, address));
            formReset();
            setSubmitted(true);
        }*/
    };

    const formReset = () => {
        setName('')
        setDescription('');
        setQuantity('');
        setType('');
        setPricePerUnit('');


    };

    if (submitted) {
        return (
            <Redirect to='/FarmerHome' />
        );
    } else {
        return (<>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type='text' value={name} onChange={ev => setName(ev.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control required type='text' value={description} onChange={ev => setDescription(ev.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control required type='text' value={quantity} onChange={ev => setQuantity(ev.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>

                        <Form.Select aria-label="Default select example">
                            <option>Select product type</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Fruits and Vegetables')
                            }}>Fruits and Vegetables</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Dairy')
                            }}>Dairy</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Meat and salumi')
                            }}>Meat and salumi</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Sea products')
                            }}>Sea products</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Baker and sweets')
                            }}>Baker and sweets</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Beverages')
                            }}>Beverages</option>
                        </Form.Select>

                    </Form.Group>
                    <Form.Group className="mt-2" controlId="formPricePerUnit">
                        <Form.Label>Price per unit</Form.Label>
                        <Form.Control required type='text' value={pricePerUnit} onChange={ev => setPricePerUnit(ev.target.value)} />
                    </Form.Group>


                    <Button className="mt-3" onClick={handleAdd}>Add product</Button>
                    <Form.Text className="text-danger">{errorMessage}</Form.Text>
                </Form >
            </>
        );
    }

}

function EditProductForm(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [typeName, setTypeName] = useState('Select product type');

    const handleAdd = (event) => {
        event.preventDefault();


        props.handleCloseEdit();


        /*let valid = true;
        if (name === '') {
            setErrorMessage('Missing name description!');
            valid = false;
        }
        if (description === '') {
            setErrorMessage('Missing surname description!');
            valid = false;
        }
        if (quantity === '') {
            setErrorMessage('Missing password description!');
            valid = false;
        }
        if (type === '') {
            setErrorMessage('Missing email description!');
            valid = false;
        }
        if (pricePerUnit === '') {
            setErrorMessage('Missing phoneNumber description!');
            valid = false;
        }



        if (valid) {
            //props.addClient(new Client(name, surname, email, password, phoneNumber, address));
            formReset();
            setSubmitted(true);
        }*/
    };

    const formReset = () => {
        setName('')
        setDescription('');
        setQuantity('');
        setType('');
        setPricePerUnit('');


    };

    if (submitted) {
        return (
            <Redirect to='/FarmerHome' />
        );
    } else {
        return (<>
                <Form>
                    <img className="imaEdit" src={require('../ProductImages/' + "p"+props.productToEdit.Id.toString()+"-1.jpg").default} />
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type='text' defaultValue={props.productToEdit.Name} onChange={ev => setName(ev.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control required type='text' defaultValue={props.productToEdit.Description} onChange={ev => setDescription(ev.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control required type='text' defaultValue={props.productToEdit.Quantity} onChange={ev => setQuantity(ev.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>

                        <Form.Select aria-label="Default select example">
                            <option>Select product type</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Fruits and Vegetables')
                            }}>Fruits and Vegetables</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Dairy')
                            }}>Dairy</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Meat and salumi')
                            }}>Meat and salumi</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Sea products')
                            }}>Sea products</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Baker and sweets')
                            }}>Baker and sweets</option>
                            <option value={type} onSelect={ev =>{  setType(ev.target.value);
                                setTypeName('Beverages')
                            }}>Beverages</option>
                        </Form.Select>

                    </Form.Group>
                    <Form.Group className="mt-2" controlId="formPricePerUnit">
                        <Form.Label>Price per unit</Form.Label>
                        <Form.Control required type='text' defaultValue={props.productToEdit.PricePerUnit} onChange={ev => setPricePerUnit(ev.target.value)} />
                    </Form.Group>


                    <Button className="mt-3" onClick={handleAdd}>Register</Button>
                    <Form.Text className="text-danger">{errorMessage}</Form.Text>
                </Form >
            </>
        );
    }

}


export default FarmerHome;