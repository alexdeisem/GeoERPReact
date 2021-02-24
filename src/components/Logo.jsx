import React from 'react';
import '../scss/Logo.scss';

export function Logo(props) {
    return (
      <span className={`${props.className} logoBrand`}>
        <span className="mainColor" style={{fontSize: props.fontSize, fontWeight: props.weight}}>Geo</span>
        <span className="secondColor" style={{fontSize: props.fontSize, fontWeight: props.weight}}>ERP</span>
      </span>
    )
}
