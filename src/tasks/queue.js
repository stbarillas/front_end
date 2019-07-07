function joinQueue(props) {
    const url = 'http://127.0.0.1:8000/checklist/',
        isoDate = new Date().toISOString(),
        user_id = sessionStorage.getItem('user_id'),
        full_name = sessionStorage.getItem('full_name');
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
        .then(response => {
            console.log('Success:', JSON.stringify(response))
        })
        .catch(error => console.error('Error Posting Checklist:', error));

}

function leaveQueue(props, callback) {
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
                    const userId = String(listEntry.user_pk),
                        instrumentId = String(listEntry.instrument_pk);
                    // Only returns checklist entries that match user pk and instrument pk
                    return userId.indexOf(sessionStorage.getItem('user_id')) !== -1 &&
                        instrumentId.indexOf(props.data.id) !== -1;
                })
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

function getQueue(props) {
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
                    const userId = String(listEntry.user_pk),
                        instrumentId = String(listEntry.instrument_pk);
                    // Only returns checklist entries that match user pk and instrument pk
                    return userId.indexOf(sessionStorage.getItem('user_id')) !== -1 &&
                        instrumentId.indexOf(props.data.id) !== -1;
                })
            return filteredChecklist
        })
        .catch(error => console.error('API error:', error));
}

export {joinQueue, leaveQueue, getQueue}