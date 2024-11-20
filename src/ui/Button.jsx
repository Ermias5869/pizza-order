import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Button({children, disabled,to}) {
     const className=
     `bg-yellow-400 inline-block  px-4 py-3
    text-stone-800 uppercase tracking-wide rounded-full
     hover:bg-yellow-300  transition-colors duration-300 
     focus:outline-none focus:ring focus:ring-yellow-300
     focus:bg-yellow-300 focus:ring-offset-2
     disabled:cursor-not-allowed sm:px-6 sm:py-4`;

    if(to) return <Link className={className} to={to}>{children}</Link>
  return (
    <button  disabled={ disabled}  className={className}>
         {children}
    </button>
  )
}
Button.propTypes = {
    children: PropTypes.node.isRequired, // Ensures children are passed and can be any renderable node
    disabled: PropTypes.bool, // Ensures disabled is a boolean
    to: PropTypes.node.isRequired,  
};
  
  Button.defaultProps = {
    disabled: false, // Sets a default value for the disabled prop
  };