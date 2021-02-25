function DateCell(props) {
  const toLocaleDate = (stringDate) => {
    return new Date(stringDate).toLocaleDateString();
  }

  const displayValue = props.value ? toLocaleDate(props.value) : '';

  return (
    <span>{displayValue}</span>
  );
};

export { DateCell };