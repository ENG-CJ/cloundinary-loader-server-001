import React, { useContext } from 'react'
import { Card,Button } from 'react-bootstrap'
import { AppContext } from '../context/AppContext'
import { ThreeDots} from 'react-loader-spinner'
export default function ImageList({image}) {
  const {deleting,deleteImage}= useContext(AppContext)
  return (
     <Card style={{ width: '18rem', marginTop: 10 }}>
      <Card.Img variant="top" src={`${image.secure_url}`} />
      <Card.Body>
        <Card.Title>Resource: {image.resource_type}</Card.Title>
        <Card.Text>
         <p>Original Profile: {image.created_at}</p>
         <p>AsserId : {image.asset_id}</p>
        </Card.Text>
        {deleting? <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />  : <Button variant={'outline-danger'} onClick={()=> {
        var split = image.public_id.split("/");
        var join = split.join("_")
        deleteImage(join);
       }} >Delete {image.public_id}</Button>}
      
      </Card.Body>
    </Card>
  )
}
