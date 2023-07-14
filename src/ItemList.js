import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/itemList.css";

const ItemList = () => {
  const [selectedItemId, setSelectedItemId] = useState("");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [updateName, setUpdateName] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateQuantity, setUpdateQuantity] = useState("");

  const handleUpdateNameChange = (event) => setUpdateName(event.target.value);
  const handleUpdateDescriptionChange = (event) =>
    setUpdateDescription(event.target.value);
  const handleUpdatePriceChange = (event) => setUpdatePrice(event.target.value);
  const handleUpdateQuantityChange = (event) =>
    setUpdateQuantity(event.target.value);

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/items")
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) =>
    setDescription(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleQuantityChange = (event) => setQuantity(event.target.value);

  const handleAddItem = () => {
    const newItem = { name, description, price, quantity };
    axios
      .post("http://localhost:8070/api/items", newItem)
      .then((response) => {
        setItems([...items, response.data.item]);
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateItem = () => {
    const updatedItem = {
      name: updateName,
      description: updateDescription,
      price: updatePrice,
      quantity: updateQuantity,
    };

    axios
      .put(`http://localhost:8070/api/items/${selectedItemId}`, updatedItem)
      .then((response) => {
        const updatedItems = items.map((item) => {
          if (item._id === selectedItemId) {
            return response.data.item;
          }
          return item;
        });
        setItems(updatedItems);
        setSelectedItemId("");
        setUpdateName("");
        setUpdateDescription("");
        setUpdatePrice("");
        setUpdateQuantity("");
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteItem = (id) => {
    axios
      .delete(`http://localhost:8070/api/items/${id}`)
      .then(() => setItems(items.filter((item) => item._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1 className="title">Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} ({item.quantity}) - ${item.price} - {item.description}
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
            <button onClick={() => setSelectedItemId(item._id)}>Edit</button>
          </li>
        ))}
      </ul>
      <h2 className="subtitle">Add Item</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="textarea-field"
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="input-field"
        />
      </div>
      <button onClick={handleAddItem} className="action-button">
        Add Item
      </button>
      <h2 className="subtitle">Update Item</h2>
      {selectedItemId && (
        <div>
          <label htmlFor="updateName">Name:</label>
          <input
            type="text"
            id="updateName"
            value={updateName}
            onChange={handleUpdateNameChange}
            className="input-field"
          />
          <label htmlFor="updateDescription">Description:</label>
          <textarea
            id="updateDescription"
            value={updateDescription}
            onChange={handleUpdateDescriptionChange}
            className="textarea-field"
          />
          <label htmlFor="updatePrice">Price:</label>
          <input
            type="number"
            id="updatePrice"
            value={updatePrice}
            onChange={handleUpdatePriceChange}
            className="input-field"
          />
          <label htmlFor="updateQuantity">Quantity:</label>
          <input
            type="number"
            id="updateQuantity"
            value={updateQuantity}
            onChange={handleUpdateQuantityChange}
            className="input-field"
          />
          <button onClick={handleUpdateItem} className="action-button">
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;
