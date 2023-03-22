import { useEffect, useCallback, useState } from 'react';

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
        age: data[key].age
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
    <div className="Home">
      {
        loadedData.map((item) => (
          <div>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.age}</p>
          </div>
        ))
      }
    </div>
  );
}

export default ShowUsers;
