import { Card, CardContent, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllNews } from "../../redux/actions";
import Loader from "../Loader";

export default function NewsStats() {
  const dispatch = useDispatch();
  const allNews = useSelector(state => state.allNews);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if(allNews.length === 0) {
      setIsLoading(true);
      dispatch(getAllNews());
      setIsLoading(false);
    }
  },[dispatch, allNews])

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
          <Typography variant='h5' component='h3' align='center'>TOTAL NEWS</Typography>
          <Typography 
            variant='h3' 
            component='p' 
            align='center'
            sx={{
              weight:'auto',
            }}
          >
            {allNews.length}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}