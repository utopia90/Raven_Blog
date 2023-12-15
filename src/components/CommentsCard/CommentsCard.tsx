import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


interface CommentCardI {
 name: string,
 email: string,
 body: string
}
export default function CommentsCard({name, email, body}: CommentCardI) {
  return (
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {email}
      </Typography>
      <Typography variant="h6" component="div">
         {name}
        </Typography>
      <Typography variant="body2">
        {body}
      </Typography>
    </CardContent>
  </Card>
  )
}
