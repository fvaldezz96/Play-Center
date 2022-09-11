import { Card, CardContent, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../redux/actions";
import Loader from "../Loader";

export default function ForumStats() {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.posts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if(allPosts.length === 0) {
      setIsLoading(true);
      dispatch(getAllPosts());
      setIsLoading(false);
    }
  },[dispatch, allPosts])

  if(isLoading) {
      return <Loader />
  } else {
    return(
      <Card
      sx={{
        height: '100%',
        weight: '100%',
        padding: '10px',
        bgcolor: grey[300],
      }}
      variant='outlined'
      >
        <CardContent
        sx={{
          margin: 'auto'
        }}
        >
          <Typography variant='h5' component='h3' align='center'>TOTAL POSTS</Typography>
          <Typography 
            variant='h3' 
            component='p' 
            align='center'
            sx={{
              weight:'auto',
            }}
          >
            {allPosts.length}
          </Typography>
        </CardContent>
      </Card>
    )
  }

}