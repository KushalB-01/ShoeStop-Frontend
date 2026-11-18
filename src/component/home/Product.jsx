import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { Button } from 'react-bootstrap';
import { productContext } from '../contextAPI/Context';
import { API_URL } from '../../config';

const Product = () => {
  const [products, setProducts] = useState([]);

  const { token, getFav } = useContext(productContext);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/getproducts`);
      setProducts(response.data);
    } catch (error) {
      console.error('Could not fetch products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToFavourites = async (product) => {
    if (!token) {
      alert('Please login to add favourites.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/addfav`,
        {
          image: product.image,
          title: product.title,
          company: product.company,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 202) {
        alert('Already in your favourites!');
      } else {
        alert('Added to favourites!');
        getFav();
      }
    } catch (error) {
      console.error('Favourite error:', error.response?.data || error.message);
      alert('Could not add to favourites. Please try again.');
    }
  };

  const addtoCart = async (image, title, company, price) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/addcart`,
        { image, title, company, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 202) {
        alert('Already in cart!');
      } else {
        alert('Item added to cart!');
      }
    } catch (error) {
      console.error('Cart error:', error);
      alert('Could not add item to cart.');
    }
  };

  return (
    <div className="product">
      <h3 className="text-center p-4">Products</h3>

      <div className="pro-layout">
        {products && products.length > 0 ? (
          products.map((li) => (
            <div className="cardz" key={li._id}>
              <img src={li.image} className="image" alt={li.title} />

              <p className="title">{li.title}</p>

              <div className="comrice">
                <p className="company">{li.company}</p>
                <p className="price text-dark">Rs:{li.price}</p>
              </div>

              <div className="btns">
                <Button
                  variant="outline-danger"
                  className="me-2"
                  onClick={() => addToFavourites(li)}
                  title="Add to favourites"
                >
                  ♥
                </Button>

                <Button
                  variant="success"
                  onClick={() =>
                    addtoCart(li.image, li.title, li.company, li.price)
                  }
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;