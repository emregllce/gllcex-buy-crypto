import React from 'react'

const ButtonGroup = ({handleClick}) => {
  return (
    <div>
    <div className="btn-group">
      <div className="btn-line">
        <div className="btn-header">
            <h4>Time : </h4>

        </div>
        <div >
          <button onClick={handleClick} className="button">1m</button>
          <button onClick={handleClick} className="button">5m</button>
          <button onClick={handleClick} className="button">15m</button>
          <button onClick={handleClick} className="button">1h</button>
          <button onClick={handleClick} className="button">4h</button>
          <button onClick={handleClick} className="button">1d</button>
          <button onClick={handleClick} className="button">1w</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ButtonGroup