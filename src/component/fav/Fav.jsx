import React, { useContext, useEffect } from 'react';
import './fav.css';
import { Button } from 'react-bootstrap';
import { productContext } from '../contextAPI/Context';
import axios from 'axios';
import { API_URL } from '../../config';

const Fav = () => {
  const { favProList, token, getFav } = useContext(productContext);

  useEffect(() => {
    getFav();
  }, []);

  const removeFavItems = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/addfav/${id}`);
      await getFav();
    } catch (error) {
      console.error('Could not remove favourite:', error);
      alert('Could not remove this item.');
    }
  };

  return (
    <div>
      {favProList.length > 0 ? (
        <div className="fav">
          <h4>{favProList.length} favourite items</h4>

          {favProList.map((li) => (
            <div className="items" key={li._id}>
              <img src={li.image} className="img" alt={li.title} />

              <p className="title">{li.title}</p>
              <p className="company">{li.company}</p>
              <p className="price text-dark">Rs:{li.price}</p>

              <div className="Fbtns">
                <Button
                  variant="danger"
                  onClick={() => removeFavItems(li._id)}
                >
                  Remove from Favourites
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-items">
          <p>No favourite items here</p>
        </div>
      )}
    </div>
  );
};

export default Fav;