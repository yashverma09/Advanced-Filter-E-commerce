import Input from "../../components/Input";
import "./Price.css";

const Price = ({ handleChange }) => {
  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title price-title">Price</h2>

        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>All
        </label>

        <Input
          handleChange={handleChange}
          value="₹2000 - ₹2500"
          title="₹2000 - ₹2500"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="₹2500 - ₹3000"
          title="₹2500 - ₹3000"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="₹3000 - ₹3500"
          title="₹3000 - ₹3500"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="Over ₹3500"
          title="Over ₹3500"
          name="test2"
        />
      </div>
    </>
  );
};

export default Price;
