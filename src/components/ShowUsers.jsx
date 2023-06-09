import { useEffect, useCallback, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import './ShowUsers.css'

function ShowUsers() {
  const [loadedData, setLoadedData] = useState([]);

  const getData = useCallback(async () => {
    const res = await fetch('https://loginappszkola-default-rtdb.firebaseio.com/data.json')
    const data = await res.json()

    const resData = []
    for(const key in data){
      resData.push({
        name: data[key].name,
        email: data[key].email,
        age: data[key].age,
        image: data[key].image
      })
    }

    return resData
  },[])

  useEffect(() => {
    getData().then((data) => {
      setLoadedData(data)
    })
  },[getData()])


  return (
    <div className="users">
      <Link className='backButton' to='/'><i className="fa-solid fa-arrow-left"></i></Link>
      {
        loadedData.map((item) => (        
          <div className='user__container'>
            <div className='user-info-st'>
              <img src={item.image}/>
              <p>{item.name}</p>
            </div>
            <div className='user-info'>
                <p><i className="fa-solid fa-envelope"></i><span>{item.email}</span></p>
                <p><i className="fa-solid fa-user"></i><span>{item.age} lat</span></p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default ShowUsers;
