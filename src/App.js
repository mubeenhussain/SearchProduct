import logo from './logo.svg';
import './App.css';
import React,{useEffect,useMemo,useState} from 'react'
import SearchBox from './Components/SearchBox';
import Card from './Components/Card';
import axios from 'axios';
import Heading from './Components/Heading';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(()=>{
    axios.get('https://services-dev.youonline.online/api/get_automotive_make_and_models/')
    .then((response)=>{
      setData(response?.data?.response);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])

  const filteredArray = useMemo(()=>{  
    if(search!==''){
      let products = [];
    for ( const brand of data ){
    const modal =  brand.atuomotivemodel_automotivemake.filter( (item,index) => {          
            if(item.title.toLowerCase().includes(search.toLowerCase()) ){
              return item;
            }
         })
    if(modal.length>0){
      products.push({title:brand.title,modal});
    }
    }
    return products;
    }  
  },[search])
  
  return (
    <div className="App" style={{display:"flex",justifyContent:"center"}}>
      <div style={{display:"flex",flexDirection:"column",width:"75%"}}>

        <SearchBox className="mt-2" search={search} setSearch={setSearch} filteredArray={filteredArray} />
        {search === ''? data?.map((brand)=>(
          <>
          <Heading>
            {brand?.title}
          </Heading>
          
          <div class="grid grid-cols-4 gap-4">
          {
            brand?.atuomotivemodel_automotivemake?.map((model)=>(
              <div>
                <Card title={model.title} year={model?.year} data={data} />
              </div>
              ))
            }         
          </div>
          
          </>
        ))
        :
        filteredArray?.map((brand)=>(
          <>
          <Heading>
            {brand?.title}
          </Heading>
          
          <div class="grid grid-cols-4 gap-4">
          {
            brand?.modal?.map((model)=>(
              <div>
                <Card title={model.title} year={model?.year} data={data} />
              </div>
              ))
            }         
          </div>
          
          </>
        ))
      }
      </div>
    </div>
  );
}

export default App;
