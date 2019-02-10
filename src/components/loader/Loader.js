import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './loader.css';

const Loader = (props) => {
  const { errorMessage } = props;

  return (
    <div id = "loader">
      { getBody(errorMessage) }
    </div>
  );
}

function getBody(errorMessage) {
    if (errorMessage) {
      return <div className = "error">
               <i className = "glyphicon glyphicon-warning-sign"></i>
               { errorMessage }
             </div>;
    }
    
    return <div>
             <div className = "dot"></div>
             <div className = "lading"></div>
           </div>;
}

Loader.propTypes = {
  error: PropTypes.object
}

export default Loader;