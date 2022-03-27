import "./DropDown.scss";

const DropDown = ({ axis, data, doChange, label, value }) => {
  return (
    <div className="dropdown">
      <label className="label" htmlFor={`select-${axis}`}>
        {axis}-axis:
      </label>
      <select
        className="select"
        id={`select-${axis}`}
        onChange={doChange}
        value={value}
      >
        {data.map((item) => {
          return <option key={item}>{item}</option>;
        })}
      </select>
    </div>
  );
};

export default DropDown;
