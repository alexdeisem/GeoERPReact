import React from 'react';
import '../scss/Logo.scss';

export class Logo extends React.Component {
  render() {

    return (
        <span className="p-text-light">
          <span className="mainColor" style={{fontSize: this.props.fontSize, fontWeight: this.props.weight}}>Geo</span>
          <span className="secondColor" style={{fontSize: this.props.fontSize, fontWeight: this.props.weight}}>ERP</span>
        </span>
    )
  }
}
