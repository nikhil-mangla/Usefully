import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";

const Create = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);

    Firebase.storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          Firebase.firestore()
            .collection("products")
            .add({
              name,
              category,
              price,
              description,
              type,
              url,
              userId: user.uid,
            })
            .then(() => {
              setLoading(false);
              history.push("/");
            })
            .catch((error) => {
              setLoading(false);
              console.error("Error adding product:", error);
            });
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error uploading image:", error);
      });
  };

  return (
    <Fragment>
      <Header />
      {loading && <GoLoading />}
      <div className="centerDiv">
        <label>Name</label>
        <input
          className="input"
          type="text"
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <label>Category:</label>
        <select
          name="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          <option>Select Category</option>
          <option value="Cars">Cars</option>
          <option value="Cameras & Lenses">Cameras & Lenses</option>
          <option value="Computers & Laptops">Computers & Laptops</option>
          <option value="Mobile Phones">Mobile Phones</option>
          <option value="Motorcycles">Motorcycles</option>
          <option value="Tablets">Tablets</option>
        </select>
        
        <label>Price</label>
        <input
          className="input"
          type="number"
          name="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Type (Sell/Rent)</label>
        <input
          className="input"
          type="text"
          name="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <label>Description</label>
        <input
          className="input"
          type="text"
          name="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {image && (
          <img
            alt="Preview"
            width="200px"
            height="200px"
            src={URL.createObjectURL(image)}
          />
        )}
        
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="uploadBtn" onClick={handleSubmit}>
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
