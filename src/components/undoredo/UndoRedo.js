import React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';

const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <div className = "col-md-4 col-md-offset-4 text-center">
    <button className = "btn btn-primary" onClick = { onUndo } disabled = { !canUndo }>
      Undo
    </button>
    <button className = "btn btn-primary" onClick = { onRedo } disabled = { !canRedo }>
      Redo
    </button>
  </div>
);

export default connect((state) => ({
  canUndo: state.cart.past.length > 0,
  canRedo: state.cart.future.length > 0
}), {
  onUndo: () => UndoActionCreators.undo(), 
  onRedo: () => UndoActionCreators.redo()
})(UndoRedo);