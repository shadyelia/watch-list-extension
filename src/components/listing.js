const Listing = (props) => {
  const { items = [], onCheck, onRemove } = props;

  if (!items.length) {
    return <div>No items available.</div>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.name}
          </a>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => onCheck(item.id)}
          />
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default Listing;
