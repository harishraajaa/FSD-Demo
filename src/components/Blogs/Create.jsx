import React,{useState} from 'react'
import TopBar from '../common/TopBar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlogCard from '../common/BlogCard';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import apiService from '../../service/apiService'
import ApiRoutes from '../../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/UseLogout'
const validExtensions = ["jpg","png","jpeg"]

function CreateBlog() {
  let [title,setTitle] = useState(null)
  let [description,setDesc] = useState(null)
  let [image,setImage] = useState(null)
  let navigate = useNavigate();
  let logout = useLogout()
  
  const validateFile = (file)=>{
    
    let extension = file.name.split(".")[file.name.split(".").length-1]
    return validExtensions.includes(extension)
  }

  const handleFileChange = (e)=>{
    let file = e.target.files[0]
    if(validateFile(file))
    {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setImage(reader.result)
      }
    }
    else
    {
      toast.error(`Invalid Image. Only ${validExtensions.join(",")} are allowed!`)
    }
  }

  const handleSubmit = async()=>{
    try {
      let {CREATE_BLOGS} = ApiRoutes
      //console.log(title,image,description)
      let response = await apiService.post(`${CREATE_BLOGS.path}`,{title,image,description},{
        authenticate:CREATE_BLOGS.authenticate
      })
      toast.success(response.message)
      navigate('/blogs')
    } catch (error) {
      if(error.status === 401)
        logout()
      else if (error.status===413){
        toast.error(`File size is too large to upload`)
      }
    }
  }

  return <>
    <TopBar/>
    <Container fluid>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Title"  onChange={(e)=>setTitle(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="file" onChange={handleFileChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" onChange={(e)=>setDesc(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" onClick={()=>handleSubmit()}>
              Submit
            </Button>
          </Form>
        </Col>
        <Col><BlogCard data={{title,image,description}}/></Col>
      </Row>
    </Container>
  </>
}

export default CreateBlog