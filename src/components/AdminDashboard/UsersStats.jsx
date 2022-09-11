import { Card, CardContent, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUsers } from "../../redux/actions";
import Loader from "../Loader";

export default function UsersStats() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if(users.length === 0) {
      setIsLoading(true);
      dispatch(getUsers());
      setIsLoading(false);
    }
  },[dispatch, users])
  
  const premiumUsers = users.filter(user => user.plan === true);

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
          <div>
            <Typography variant='h5' component='h3' align='center'>TOTAL USERS</Typography>
            <Typography 
              variant='h3' 
              component='p' 
              align='center'
              sx={{
                weight:'auto',
              }}
            >
              {users.length}
            </Typography>
          </div>
          <div className="mt-3">
            <Typography variant='h5' component='h3' align='center'>Free users: {users.length - premiumUsers.length}</Typography>
            <Typography variant='h5' component='h3' align='center'>Premium users: {premiumUsers.length}</Typography>
          </div>
        </CardContent>
      </Card>
    )
  }
}