import axios from 'axios';
import { useEffect, useState } from 'react';

const Form: React.FC = () => {
  const URL = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=%22engineering%22&srlimit=10`;

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      //   const response = await fetch(URL, { mode: 'no-cors' });
      const response = await axios.get(URL);
      console.log(response.data);
      setData(response.data.query.search);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data.map((item: any) => (
        <div key={item.pageid}>
          <h3>{item.title}</h3>

          <div dangerouslySetInnerHTML={{ __html: item.snippet }}></div>
          <p>{}</p>
        </div>
      ))}
    </div>
  );
};

export default Form;
