import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ThemeContext } from '../App';

function Details() {
  const [data, setData] = useState({});
  const [selectedColor, setSelectedColor] = useState('');
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const theme = useContext(ThemeContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      fetch(
        `https://strapi-store-server.onrender.com/api/products/${params.id}`
      )
        .then((res) => res.json())
        .then((d) => {
          // console.log(18, d);
          if (!d.data) {
            navigate('/');
          }
          setData(d);
          setSelectedColor(d.data.attributes.colors[0]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate('/');
    }
  }, []);

  function getData () {
    let data = [];
    if (localStorage.getItem('data')) {
      data = JSON.parse(localStorage.getItem('data'))
    }
    return data
  }

  function handleLocal (e) {
    e.preventDefault();
    let user = {
      imge: data.data.attributes.image,
      name: data.data.attributes.title,
      company: data.data.attributes.company,
      price: data.data.attributes.price / 100,
      description: data.data.attributes.description,
      colors: data.data.attributes.colors,
      amout: count
    }
    let u = getData();
    u.push(user)
    localStorage.setItem('data' , JSON.stringify(u))

  }

  return (
    <div
      className={`w-3/5 mx-auto py-20 ${
        theme.theme == 'dark' ? 'text-white' : 'text-black'
      }`}
    >
      {
        loading && <span className="loading loading-ring loading-lg block mx-auto mt-60"></span>
      }

      {!loading && (
        <>
          <div className='text-sm breadcrumbs'>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/products'>Products</Link>
              </li>
            </ul>
          </div>

          <div className='detail flex gap-20 items-start'>
            {data?.data?.id && (
              <>
                <div className='card-img mt-6 w-1/2'>
                  <img
                    className='rounded-3xl h-[500px] object-cover w-full'
                    src={data.data.attributes.image}
                    alt=''
                  />
                </div>

                <div className='card-info w-1/2'>
                  <p className='text-3xl mb-5 capitalize font-bold mt-2'>
                    {data.data.attributes.title}
                  </p>
                  <p className='text-neutral-content text-xl mb-2'>
                    {data.data.attributes.company}
                  </p>
                  <p className='text-xl mb-3'>
                    ${data.data.attributes.price / 100}
                  </p>

                  <p className='mt-6 leading-8'>
                    {data.data.attributes.description}
                  </p>

                  <div className='form'>
                    {/* colors */}
                    <label htmlFor='' className='text-lg mt-8 block'>
                      Colors
                    </label>
                    <div className='colors flex items-center gap-2 mt-3'>
                      {data.data.attributes.colors.length > 0 &&
                        data.data.attributes.colors.map((color, index) => {
                          return (
                            <span
                              style={{
                                backgroundColor: color,
                                border:
                                  color == selectedColor
                                    ? '1px solid black'
                                    : 'none',
                              }}
                              key={index}
                              className={`w-5 h-5 rounded-full block cursor-pointer`}
                              onClick={() => {
                                setSelectedColor(color);
                              }}
                            ></span>
                          );
                        })}
                    </div>

                    {/* amount */}
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

                    <button onClick={handleLocal} className='btn btn-active btn-primary mt-8 uppercase'>
                      Add to bag
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
