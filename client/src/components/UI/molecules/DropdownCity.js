import React from 'react'; // useEffect
import { DownArrow } from '../../../assets/img';
// import client from '../../../client/client';

const DropdownCity = ({ city, setCity, setcityNum }) => {
  // state, cities 나중에 props로 받아도록 수정
  const cities = ['강남구', '관악구', '광진구'];
  // const [cities, setCities] = useState([]);

  // const getCityData = async () => {
  //   const response = await client.get('/addresses');

  //   setCities(response.data);
  // };

  // useEffect(() => {
  //   getCityData();
  // }, []);

  const handleClick = (e, idx) => {
    setCity(e.firstChild.data);
    setcityNum(idx);
  };

  return (
    <div className="dropdown dropdown-bottom">
      <label
        tabIndex={0}
        className="w-[333px] h-[60px] btn m-1 rounded-[7px] border-2 border-main bg-white text text-400 justify-between pl-[22px] pr-[13px] hover:bg-white hover:border-2 hover:border-main"
      >
        {city}
        <DownArrow />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-white text text-400 rounded-box w-[338px]"
      >
        {cities.map((el, idx) => (
          <li value={el} key={el} onClick={e => handleClick(e.target, idx)}>
            <a className="active:bg-main active:text-white">{el}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownCity;
