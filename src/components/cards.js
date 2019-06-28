import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function InstrumentCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.data.instrument_name}
                    </Typography>
                </CardContent>
                <CardMedia
                    className={classes.media}
                    image={props.data.instrument_image}
                    title="Hello World"
                />
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={()=>joinWaitList(props)}>
                    Join Waitlist
                </Button>
                <Button size="small" color="primary" onClick={()=>leaveWaitList(props)}>
                    Leave Waitlist
                </Button>
            </CardActions>
        </Card>
    );
}

function joinWaitList(props) {
    const url = 'http://127.0.0.1:8000/checklist/',
        isoDate = new Date().toISOString(),
        user_id = sessionStorage.getItem('user_id'),
        full_name = sessionStorage.getItem('full_name');
    const data = {
        "user": 'http://127.0.0.1:8000/users/' + user_id + '/',
        "display_name": full_name,
        "instrument_pk": props.data.id,
        "created_date": isoDate,
        "ownership_date": isoDate,
    }
    console.log(sessionStorage.getItem('token'))
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem('token')
        }
    })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error Posting Checklist:', error));

}

function leaveWaitList(props) {
    var url = 'http://127.0.0.1:8000/checklists/' + 27,
        isoDate = new Date().toISOString();

    fetch(url, {
        method: 'DELETE', // or 'PUT'
        headers:{
        }
    })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error Posting Checklist:', error));

}

export default InstrumentCard;