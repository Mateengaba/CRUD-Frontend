import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BASEURL } from '../confg';
import { getUser } from './utles/functions';
import axios from 'axios';


const Body = () => {
  // State Variables
  const [modal, setModal] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');
  // const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [id, setid] = useState("");
  const [form, setForm] = useState(true);
  const [previousValues, setPreviousValues] = useState({});



  // Function to add a new item
  const addItem = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);

      const user = getUser();
      const objToSend = {
        title: productTitle,
        desc: productDesc,
        price: productPrice,
        userId: user._id,
      };

      const response = await axios.post(`${BASEURL}/createpost`, objToSend);

      if (response.data.status) {
        // console.log("post created", response);
        setRefresh(!refresh);

      } else {
        alert(response.data.message);
        alert('Collection successfully added');

      }

      setLoader(false);
      setModal(false)


    } catch (error) {
      setLoader(false);
      console.error(error);
      alert(error.message);
    }
  };

  //get data
  useEffect(() => {
    const getData = async () => {
      const postData = await axios.get(`${BASEURL}/getpost`);
      console.log(postData.data.data);
      setAllProducts([...postData.data.data]);
    };
    getData();
  }, [refresh]);


  // console.log(allProducts) r



  //deletePost function

  const deletePost = async (id) => {
    const cnf = window.confirm("Kya aap isey delete karna chahte hain?");

    if (cnf) {
      try {
        const response = await axios.delete(`${BASEURL}/deletepost/${id}`);

        if (response.data.status) {
          alert("Post successfully deleted");
          setRefresh(!refresh); // Data ko refresh karne ke liye
        } else {
          alert("Post deletion failed");
        }
      } catch (error) {
        console.error("Error deleting post", error);
        alert("Post deletion failed");
      }
    }
  };


  //editPost function

  const editPost = (product) => {
    // Store previous values
    setPreviousValues({
      title: product.title,
      desc: product.desc,
      price: product.price,
    });
    console.log(product)
    // Set existing values
    setProductTitle(product.title);
    setProductDesc(product.desc);
    setProductPrice(product.price);
    setid(product._id);
    setModal(true);
    setForm(false);
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      const objToSend = {
        title: productTitle,
        desc: productDesc,
        price: productPrice,
      };

      // Combine previous values and updated values
      const updatedValues = {
        ...previousValues,
        ...objToSend,
      };

      const response = await axios.put(`${BASEURL}/updatepost/${id}`, updatedValues);

      if (response.data.status) {
        alert("Post successfully updated");
        setRefresh(!refresh);
      } else {
        alert("Post updated failed");
      }
    } catch (error) {
      console.log(error);
    }
    setModal(false);
    setForm(true);
  };


  return (
    <Container className="py-4 mt-4">
      <h1 className="text-center text-cyan-700 fw-bold text-3xl mb-3"> Dashboard <br /><br />  ADD YOUR PRODUCTS <br /> </h1>
      <hr />





      {/* Plus Button */}

      <Button onClick={() => setModal(true)} className="text-white bg-danger border-0 btn-design">
        <i className="fa fa-plus"></i>
      </Button>

      {/* Table */}
      <Table striped bordered hover responsive variant="" className="text-center text-black mt-1">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Picture</th>
            <th>Title</th>
            <th>Desc</th>
            <th>Price</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                {/* <img src={product.imageUrl} alt={product.title} width="40px" height="50px" /> */}
              </td>
              {/* <td>{product.Category}</td> */}
              <td>{product.title}</td>
              <td>{product.desc}</td>
              <td>{product.price}</td>

              <td>
                <button onClick={() => deletePost(product._id)} className='btn btn-danger'>
                  <i className='fa fa-trash'></i>
                </button>
              </td>
              <td>
                <button onClick={() => editPost(product)} className='btn btn-primary'>
                  <i className='fa fa-edit'></i>
                </button>
              </td>


            </tr>
          ))}
        </tbody>
      </Table>

      {/* Table end */}


      {/* Modal */}
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-bold">Submit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={form ? addItem : update}>
            <Form.Group className="mb-3">


            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Title</Form.Label>
              <Form.Control onChange={(e) => setProductTitle(e.target.value)} placeholder="Product Title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control as="textarea" onChange={(e) => setProductDesc(e.target.value)} placeholder="Description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Price</Form.Label>
              <Form.Control onChange={(e) => setProductPrice(e.target.value)} placeholder="Price" />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
              <Form.Label className="fw-bold">Picture</Form.Label>
              <Form.Control type="file" accept="image/*" placeholder="Upload Picture" />
            </Form.Group>
            {

              form ?

                <Button type="submit" className="w-100 mt-2 mb-3 hover:translate-y-1 bg-danger">
                  Submit
                </Button> :

                <Button type="submit" className="w-100 mt-2 mb-3 hover:translate-y-1 bg-primary">
                  Update
                </Button>

            }

          </Form>
        </Modal.Body>
      </Modal>
    </Container>

    // Modal end


  );
};

export default Body;