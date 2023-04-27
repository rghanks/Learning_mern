import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount, setName } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const name = useSelector((state) => state.counter.name);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>


      <div>
       <input type="number"  onChange={(e) =>{ setValue(parseInt(e.target.value))}}  value={value}></input>         
      
        <button
          aria-label="Add value"
          onClick={() => dispatch(incrementByAmount(value))}
        >
          Add 
        </button>

        <button
          aria-label="Add value"
          onClick={() => dispatch(setName("Rahul Gupta")) }
        >
          Set Name 
        </button>
      <p> Name : </p>
      { name }

      </div>

    </div>
  )
}