import { useEffect , useRef, useState } from "react";
import Card from "../components/Card";

useEffect
function Products() {

  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const [cotegory , setCotegory] = useState('all');
  const [company , setCompany] = useState('')
  const [sort , setSort] = useState('')
  
  useEffect(() => {
    setLoading(true);
    fetch("https://strapi-store-server.onrender.com/api/products")
      .then(res => res.json())
      .then(data => {
        setFeatured(data.data)
        // console.log(data.data);
    })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])


  const validate = () => {
    return true
  }


  function hanldecl (e) {
    e.preventDefault();
    let isValid = validate()
    let name = searchRef.current.value
    console.log(name);

    if (isValid ) {
      fetch(`https://strapi-store-server.onrender.com/api/products?search=${name}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data.data);
        setFeatured(data.data)
      })
      .catch(err => {
        console.log(err);
      })
    }


   if (isValid) {
    fetch(`https://strapi-store-server.onrender.com/api/products?search=&category=${cotegory}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data.data);
      setFeatured(data.data)
    })
    .catch(err => {
      console.log(err);
    })
   }

   if (isValid) {
    fetch(`https://strapi-store-server.onrender.com/api/products?search=&category=Kids&company=all&order=${company}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.data);
      setCotegory(data.data)
    })
    .catch(err => {
      console.log(err);
    })
   }
   

   if (isValid) {
    fetch(`https://strapi-store-server.onrender.com/api/products?search=&category=Kids&company=all&order=a-z&price=100000`)
    .then(res => res.json())
    .then(data => {
        setFeatured(data.data)
    })
    .catch(err => {
      console.log(err);
    })
   }
    
  }

  return (
    <div className="w-3/5 mx-auto mt-20">
      <div className="filter p-8 bg-primary-content rounded-md">
        <div className="filter-top flex justify-between gap-4">
          <div className="field flex flex-col gap-2 w-1/4">
            <label htmlFor="search" className="cursor-pointer">Search Product</label>
            <input ref={searchRef} type="search" className="input input-bordered input-sm w-full " id="search" />
          </div>
          <div className="field flex flex-col gap-2 w-1/4">
            <label htmlFor="select-1" className="cursor-pointer">Select Cotegory</label>
            <select value={cotegory} onChange={(e) => {setCotegory(e.target.value)}} className="select select-bordered select-sm w-full" id="select-1">
              <option value='all'>all</option>
              <option value='tables'>Tables</option>
              <option value='Chairs'>Chairs</option>
              <option value='Kids'>Kids</option>
              <option value='Sofas'>Sofas</option>
              <option value='Beds'>Beds</option>
            </select>
          </div>
          <div className="field flex flex-col gap-2 w-1/4">
            <label htmlFor="select-2" className="cursor-pointer">Select Company</label>
            <select value={company} onChange={(e) => setCompany(e.target.value)} className="select select-bordered select-sm w-full" id="select-2">
              <option value='all'>all</option>
              <option value='Modaneza'>Modaneza</option>
              <option value='Luxora'>Luxora</option>
              <option value='Artifex'>Artifex</option>
              <option value='Comfora'>Comfora</option>
              <option value='Homestead'>Homestead</option>
            </select>
          </div>
          <div className="field flex flex-col gap-2 w-1/4">
            <label htmlFor="select-3" className="cursor-pointer">Sort By</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered select-sm w-full" id="select-3">
              <option value='a-z'>a-z</option>
              <option value='z-a'>z-a</option>
              <option value='high'>high</option>
              <option value='low'>low</option>
            </select>
          </div>
        </div>
        <div className="filter-bottom justify-between  mt-8 flex gap-4 items-center">
          <div className="range-block w-1/4">
          <input type="range" min={0} max="1000" value="40" className="range range-primary" />
          </div>
          <div className="check w-1/4 ">
            <div className="form-control ">
              <label className="label cursor-pointer flex flex-col gap-1 ">
                <span className="label-text">Free shipping</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary"
                />
              </label>
            </div>
          </div>
          <div className="buttons w-1/4 flex gap-3">
          <button onClick={hanldecl} className="btn btn-primary w-full">Search</button> 
        </div>
        <div className="buttons w-1/4">
        <button className="btn btn-secondary w-full">Reset</button>
        </div>
        </div>
      </div>
      <h1 className="mt-12 pb-4 text-md">{featured.length} products</h1>
      <hr />
      <div className="products flex justify-between mt-12 flex-wrap gap-4 mb-20">
      {
            loading && <span className="loading loading-ring loading-lg block mx-auto mt-20"></span>
          }
          {
            !loading && featured.length > 0 && featured.map((el, index) => {
              return (<Card key={index} data = {el}></Card>);
            })
          }
      </div>
    </div>
  )
}

export default Products