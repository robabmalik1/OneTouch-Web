import React, { useState } from 'react'
import Jitsi from 'react-jitsi'
// import LinearProgress from '@material-ui/core/LinearProgress';

// const roomName = 'my-super-secret-meeting-123e4567-e89b-12d3-a456-426655440000'
// const userFullName = 'Joseph Strawberry'

export const Call = () => {
    const [displayName, setDisplayName] = useState('')
    const [roomName, setRoomName] = useState('')
    const password="Test123";
    // const [password, setPassword] = useState('')
    const [onCall, setOnCall] = useState(false)
    // const Loader = (<div style={{ position: 'absolute', top: 0, width: '100%' }}>
    //     <LinearProgress />
    // </div>);

    return onCall
        ? (
            <Jitsi
                roomName={roomName}
                displayName={displayName}
                password={password}
                // loadingComponent={Loader}
                onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
                containerStyle={{ width: '1200px', height: '800px', narginLeft: '5%' }}
                // frameStyle={{ display: loading ? 'none' : 'block', width: '100%', height: '100%' }}
                config={{ prejoinPageEnabled: false }}
            // , startAudioOnly: true
            // config={{ startAudioOnly: true }}
            // interfaceConfig={{ filmStripOnly: true }}
            />)
        : (
            <>
                <h1>Crate a Meeting</h1>
                <input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />
                <input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />
                <button onClick={() => setOnCall(true)}> Let&apos;s start!</button>
            </>
        )

}

export default Call;