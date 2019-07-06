import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {joinQueue, leaveQueue} from '../tasks/queue'

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
                <Button size="small" color="primary" onClick={()=>joinQueue(props)}>
                    Join Waitlist
                </Button>
                <Button size="small" color="primary" onClick={()=>leaveQueue(props)}>
                    Leave Waitlist
                </Button>
            </CardActions>
        </Card>
    );
}

export default InstrumentCard;