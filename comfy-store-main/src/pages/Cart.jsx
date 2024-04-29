import { useState } from 'react';
// import img from '../assets/react.svg'
function Cart() {
  const [count, setCount] = useState(1);
  // const [datas , setaDatas] = useState(JSON.parse(localStorage.getItem('data')))
  let users = JSON.parse(localStorage.getItem('data'));

  return (
    <div className="w-3/5 mx-auto mt-20">
      <h1 className="text-5xl mb-5">Shopping Cart</h1>
      {
        users > 0 && users.map((el , index) => {
          return (
            <div key={index}>
            <hr />
              <div className="data py-8 flex justify-between">
                <div className='flex gap-24 items-center'>
                  <div>
                    <img className='h-24 w-24' src={el.imge} alt="" />
                  </div>
                  <div>
                    <h1>{el.name}</h1>
                    <h1>modenza</h1>
                    colors
                  </div>
                  <div className='flex flex-col mt-7 gap-2'>
                    <label htmlFor='select'>Amount</label>
                    <select
                      className='select select-bordered w-full max-w-xs'
                      id='select'
                      value={count}
                      onChange={(e) => {
                        setCount(e.target.value);
                      }}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>
                      <option value={13}>13</option>
                      <option value={14}>14</option>
                      <option value={15}>15</option>
                      <option value={16}>16</option>
                      <option value={17}>17</option>
                      <option value={18}>18</option>
                      <option value={19}>19</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                </div>
                <div>
                  <p>${el.price}</p>
                </div>
      
              </div>
              <div className="calculator">
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Cart