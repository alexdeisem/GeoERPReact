function NumberCell(props) {
  const formatNum = (number) => {
    if (!number) {
      return '0.00';
    }

    return (Math.round((+number + Number.EPSILON) * 100) / 100).toFixed(2);
  }

  return (
    <span style={{fontStyle: "italic"}}>
      {formatNum(props.value)}
    </span>
  )
}

export { NumberCell }