function ValidationError(props) {
  const errors = props.errors.map((error, index) => 
    <div
      className="p-error small p-pl-1"
      key={ index }
    >
      <i className="pi pi-exclamation-triangle p-mr-1" style={{'fontSize': '0.9em'}}></i>
      <small>
        { error }
      </small>
    </div>
  );

  return (
    <div>
      {errors}
    </div>
  );
}

export default ValidationError;
