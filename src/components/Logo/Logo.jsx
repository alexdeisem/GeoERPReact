import React from 'react';
import './Logo.scss';

class Logo extends React.Component {
  render() {

    return (
      <div>
          <p className="p-text-light">
            <span className="mainColor" style={{fontSize: this.props.fontSize}}>Geo</span>
            <span className="secondColor" style={{fontSize: this.props.fontSize}}>ERP</span>
          </p>
      </div>
    )
  }
}

export default Logo;