import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LeaveQueue from './queue'

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
    console.log(user_id)
    const data = {
        "user": 'http://127.0.0.1:8000/users/' + user_id + '/',
        "user_pk": user_id,
        "display_name": full_name,
        "instrument_pk": props.data.id,
        "created_date": isoDate,
        "ownership_date": isoDate,
    }
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
    const url = 'http://127.0.0.1:8000/checklist/';
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem('token')
        }
    })
    // If response is ok, translate to json. Otherwise, throw Error
        .then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error(response.status);
            }
        })
        .then(response => {
            let filteredChecklist = response.filter(
                (listEntry)=> {
                    const userId = String(listEntry.user_pk),
                        instrumentId = String(listEntry.instrument_pk);
                    // console.log(instrumentId)
                    // Only returns checklist entries that match user pk and instrument pk
                    return userId.indexOf(sessionStorage.getItem('user_id')) !== -1 &&
                        instrumentId.indexOf(props.data.id) !== -1;
                })
            console.log(filteredChecklist)
            return filteredChecklist
        })
        .then(entry => {
            const id = entry[0].id,
                url = 'http://127.0.0.1:8000/checklist/' + id + '/';
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + sessionStorage.getItem('token')
                }
            })
            // If response is ok, translate to json. Otherwise, throw Error
                .then(response => {
                    if (response.ok) {
                        return console.log('Success:', JSON.stringify(response));
                    } else {
                        throw new Error(response.status);
                    }
                })
                .catch(error => console.error('API error:', error));

        })
        .catch(error => console.error('API error:', error));

}

export default InstrumentCard;