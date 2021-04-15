import * as React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = React.useState(false)

    React.useEffect(() => {
        setPlay(true)
    }, [trackUri])

    if (!accessToken) return null
    return (
        <SpotifyPlayer
            callback={state => {
                if(!state.isPlaying) setPlay(false)
            }}
            play={play}
            showSaveIcon
            token={accessToken}
            uri={trackUri ? [trackUri] : []}
        />
    )
}
