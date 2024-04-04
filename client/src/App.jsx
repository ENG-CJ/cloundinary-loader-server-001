import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button,Alert, Row, Col } from 'react-bootstrap'
import ImageList from './components/ImageList'
import { AppContext, AppContextProvider } from './context/AppContext'

import { ThreeDots ,MutatingDots} from 'react-loader-spinner'
function App() {
  const [image,setImage]=useState({
    image: ""
  });
  const {saving,loading,uploadImage,mesg,err,imageList,fetchImageList}= useContext(AppContext)

  const onChange = (e)=>{
    
    setImage({
      ...image,
      [e.target.name] : e.target.files[0]
    })
  }

  const submitFile = ()=>{
    var data = new FormData();
    data.append("image",image.image);
    uploadImage(data).then(()=>{
     
    })
   
  }
      useEffect(()=>{
   fetchImageList().then(()=>{
       console.log('list ',imageList)
    });
   
  },[])
  
  return (
    <>
    {err &&
     <Alert  variant={"danger"}>
          {mesg} <a className='btn'>Try Again</a>
        </Alert>
    }
   
     <div className='form-group d-flex flex-column align-items-start'>
     <label>Upload Image</label>
        <input onChange={onChange} name='image' className='form-control my-2' type='file'/>
        {saving ? <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />:  <Button onClick={submitFile} variant='outline-success'>Upload</Button> }
       
     
     </div>
     <Row>
      {loading ? <MutatingDots
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  secondaryColor="#4fa94d"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />: imageList?.map(image=>{
      return <Col xl={4} md={12}>
<ImageList image={image}/>
      </Col>  
     })}
     </Row>
    
    
    </>
  )
}

export default App
