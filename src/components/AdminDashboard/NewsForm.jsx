import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Widget } from "@uploadcare/react-widget";
import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { useState } from "react";
import * as Yup from 'yup';
import { grey } from '@mui/material/colors';
import axios from "axios";

export default function NewsForm() {
  const [img, setImg] = useState(null);

  return(
    <Box
    sx={{
      height:400,
      width:'60%',
      margin:'auto',
      bgcolor: grey[300],
      padding: '30px',
      marginTop: '50px',
      BorderAllRounded: '20px'
    }}
    >
      <h3 className="text-2xl text-center text-semibold">Add News</h3>
      <Formik
        initialValues={{
          title: '',
          short_description: '',
          article_content: ''
        }}
        validationSchema={Yup.object({
            title: Yup.string()
            .required('Please enter a title'),
            short_description: Yup.string()
            .required('Please enter a description')
            .max(256, 'Max 256 characters'),
            article_content: Yup.string().required('Please enter the content'),
          })}
        validateOnBlur={true}
        onSubmit={async (values, formikHelpers) => {
          if(img !== null) {
            axios.post('https://pf-henry-gamesportal.herokuapp.com/news', {
              title: values.title,
              short_description: values.short_description,
              article_content: values.article_content,
              main_image: img
            })
            setImg(null);
            formikHelpers.resetForm();
          }
        }}
      >
          <Form>
            <Field 
              name='title' 
              type='text' 
              as={TextField} 
              variant='outlined' 
              color='primary' 
              label='Title' 
              fullWidth
              margin='normal'
            />
						<ErrorMessage component="div" className="text-xs italic text-red-500" name="title" />

            <Field 
              name='short_description' 
              type='text' 
              as={TextField} 
              variant='outlined' 
              color='primary' 
              label='Short Description' 
              fullWidth
              multiline='true'
              margin='normal'
            />
						<ErrorMessage component="div" className="text-xs italic text-red-500" name="short_description" />

            <Field
              name='article_content' 
              type='text' 
              as={TextField} 
              variant='outlined' 
              color='primary' 
              label='Article Content' 
              fullWidth
              multiline='true'
              margin='normal'
            />
						<ErrorMessage component="div" className="text-xs italic text-red-500" name="article_content" />
            <div className="flex flex-row justify-between">
              <Field 
                as={Widget}
                name='main_image'
                publicKey="50d55201e2f94662863b"
                id="main_image"
                imagesOnly={true}
                tabs="file url"
                onChange={info => setImg(info.cdnUrl)}
                crop="free, 16:9, 4:3, 5:4, 1:1"
                clearable='true'
                
                />
              <Button 
                type="submit"
                variant='outlined'
                color='primary'
              >Add News</Button>
            </div>
          </Form>
      </Formik>
    </Box>
  )
}

// title,
// short_description,
// main_image,
// article_content,