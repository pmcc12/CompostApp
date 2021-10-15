import { useState } from "react"
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
import axiosInstance from "../utils/axios"

function ImgUpload() {
    
  const [selectedFiles, setSelectedFiles] = useState([])
//   const [progress, setProgress] = useState()
  const submitHandler = ( e:any) => {
    e.preventDefault() //prevent the form from submitting
    let formData = new FormData()

    formData.append("file", selectedFiles[0])
    console.log("file: ", selectedFiles[0])
    axiosInstance.post("/api/sell/productImg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    //   onUploadProgress: data => {
    //     //Set the progress value to show the progress bar
    //     setProgress(Math.round((100 * data.loaded) / data.total))
    //   },
    })
  }
  return (
    <Container>
      <Row>
        <Col lg={{ span: 4, offset: 3 }}>
          <Form
            action="http://localhost:5001/api/sell/productImg"
            method="post"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            {/* <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control
                type="file"
                id="exampleFormControlFile1"
                name="file"
                onChange={e => {
                  
                }}
              /> */}
            {/* </Form.Group> */}
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control
                  id="exampleFormControlFile1"
                  type="file"
                  onChange={(e: any) =>
                    setSelectedFiles(e.target.files)
                  }
                />
            </Form.Group>
            <Form.Group>
              <Button variant="info" type="submit">
                Upload
              </Button>
            </Form.Group>
             {/* {progress && <ProgressBar now={progress} label={`${progress}%`} />} */}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ImgUpload