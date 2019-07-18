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
import './cards.css'
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import ButtonAppBar from "./headers";
import Homepage from "../pages/homepage";
import UserSettings from "../pages/user_settings";
import Register from "../pages/register";
import EditInstrument from "../pages/edit_instrument";


class InstrumentCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
            userJoined: false,
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
                // Loop through queue and return entries for current instrument only
                let filteredChecklist = response.filter(
                    (listEntry) => {
                        const instrumentId = String(listEntry.instrument_pk);
                        // Only returns checklist entries that match instrument pk
                        return instrumentId.indexOf(this.props.data.id) !== -1;
                    });
                this.setState({queue: filteredChecklist})
                return filteredChecklist
            })
            .then(response => {
                let filteredChecklist = response.filter(
                    (listEntry) => {
                        const userPk = String(listEntry.user_pk),
                        currentUserId = sessionStorage.getItem('user_id');
                        // Only returns checklist entries that match user pk
                        return userPk.indexOf(currentUserId) !== -1;
                    });
                // If current user is present in queue, set userJoined to true
                if(filteredChecklist.length !==0) {
                    this.setState({userJoined: true})
                // If current user is not in queue, set userJoined to false
                } else {
                    this.setState({userJoined: false})
                }
            })
            .catch(error => console.error('API error:', error));
    }

    render () {
        const is_auth = this.props.is_auth,
        alreadyJoined = this.state.userJoined;
        let opts = {},
        button_one, edit_button;

        edit_button = (
            <Button size="small" color="primary" {...opts}>
                <Link
                    to={{
                        pathname: "/edit_instrument",
                        state: { data: this.props.data }
                    }}
                >Edit </Link>
            </Button>
        )

        // If not authenticated, disabled is added to dynamic attribute
        if (!is_auth) {
            opts['disabled'] = 'disabled';
        }

        if (alreadyJoined) {
            button_one = (
                <Button size="small" color="primary" {...opts} onClick={() => this.handleLeaveQueue()}>
                    Leave Waitlist
                </Button>
            );

        }else {
            button_one = (
                <Button size="small" color="primary" {...opts} onClick={() => this.handleJoinQueue()}>
                    Join Waitlist
                </Button>
            )
        }

        return (
            <Card>
                <CardActionArea>
                    <CardContent>
                        {this.state.queue.length===0 ?
                            <Typography gutterBottom variant="h5" component="h2" className={'available'}>
                                {this.props.data.instrument_name}
                            </Typography>
                            : <Typography gutterBottom variant="h5" component="h2" className={'inuse'}>
                                {this.props.data.instrument_name}
                            </Typography>
                        }

                    </CardContent>
                    {this.state.queue.length===0 ?
                        <CardMedia
                            image={this.props.data.instrument_image}
                            title="Hello World" style={{"height" : "200px"}}
                        />
                        : <SimpleList data={this.state.queue}/>
                    }
                </CardActionArea>
                <CardActions>
                    {button_one}
                    {edit_button}
                </CardActions>

            </Card>
        )
    };
}

export default (InstrumentCard);