import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {joinQueue, leaveQueue} from '../tasks/queue'
import SimpleList from './lists'

class InstrumentCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
        }
    }
    componentWillMount(){this.updateQueueState()}

    handleJoinQueue() {
        joinQueue(this.props).then(() => {this.updateQueueState()});
    }

    handleLeaveQueue() {
        leaveQueue(this.props).then(()=>{this.updateQueueState()});
    }

    updateQueueState() {
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
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status);
                }
            })
            .then(response => {
                let filteredChecklist = response.filter(
                    (listEntry) => {
                        const instrumentId = String(listEntry.instrument_pk);
                        // Only returns checklist entries that match user pk and instrument pk
                        return instrumentId.indexOf(this.props.data.id) !== -1;
                    });
                this.setState({queue: filteredChecklist})
            })
            .catch(error => console.error('API error:', error));
    }

    render () {
        return (
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.data.instrument_name}
                        </Typography>
                    </CardContent>
                    <SimpleList data={this.state.queue}/>
                    {/*<CardMedia*/}
                    {/*    className={classes.media}*/}
                    {/*    image={props.data.instrument_image}*/}
                    {/*    title="Hello World"*/}
                    {/*/>*/}
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => this.handleJoinQueue()}>
                        Join Waitlist
                    </Button>
                    <Button size="small" color="primary" onClick={() => this.handleLeaveQueue()}>
                        Leave Waitlist
                    </Button>
                </CardActions>
            </Card>
        )
    };
}

export default InstrumentCard;