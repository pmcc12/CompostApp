import { useState } from "react"
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
// import axiosInstance from "../utils/axios"
import axios from "axios"

function ImgUpload() {
    
  const [selectedFiles, setSelectedFiles] = useState([])
  const [progress, setProgress] = useState<any>()
  const submitHandler = ( e:any) => {
    e.preventDefault() //prevent the form from submitting
    let formData = new FormData()
    formData.append("file", selectedFiles[0])
    formData.append("key", Date.now().toString())
    // console.log("file: ", selectedFiles[0])
    axios.post("http://localhost:5001/api/sell/productImg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: data => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total))
      },
    })
  }
  return (
    <Container>
      <Row>
        <Col lg={{ span: 4, offset: 3 }}>
          <Form >
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control
                  // id="exampleFormControlFile1"
                  name="file"
                  type="file"
                  onChange={(e: any) =>
                    setSelectedFiles(e.target.files)
                  }
                />
               
            </Form.Group>
            <Form.Group>
              <Button variant="info" onClick={submitHandler}>
                Upload
              </Button>
            </Form.Group>
             {progress && <ProgressBar now={progress} label={`${progress}%`} />}
          </Form>
           <img src="https://compost-app-2-image-s3-bucket.s3.eu-west-2.amazonaws.com/" alt="" />
        </Col>
      </Row>
    </Container>
  )
}

export default ImgUpload