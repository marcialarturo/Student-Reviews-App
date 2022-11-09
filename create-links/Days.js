import React from 'react'

function Days({ ele, setHours, index }) {
  return (
    <div style={{ display: 'flex' }}>
      {/* Day */}
      <div style={{ width: '100%' }}>
        <input
          type="text"
          id={ele.day}
          name="description"
          placeholder=""
          className="add-link-input"
          defaultValue={ele.day ? ele.day : 'Mond'}
        ></input>
      </div>
      {/* Hours */}
      <div style={{ width: '100%' }}>
        <input
          type="text"
          id="hours"
          name="hours"
          placeholder="7am - 5pm"
          className="add-link-input"
          defaultValue=""
          onChange={(e) => setHours(e.target.value, index)}
        ></input>
      </div>
    </div>
  )
}

export default Days
