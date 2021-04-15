import * as React from 'react';
import Player from '../Player';
import useAuth from '../../helpers/useAuth';
import { CLIENT_ID } from '../../config';
import SpotifyWebApi from 'spotify-web-api-node';
import './dashboard.scss';

const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [playingTrack, setPlayingTrack] = React.useState();

    const selectTrack = (track) => {
        setPlayingTrack(track)
    }

    React.useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    React.useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return

        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {
            if(cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if(image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })
        return () => (cancel = true);
    }, [search, accessToken]);

    return (
        <div className="container-dashboard">
            <input
                aria-label="Search"
                className="dashboard-search"
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Songs/Artists"
                type="text"
                value={search}
            />
            <div className="search-results">
                {searchResults.map(item => (
                    <div className="search-results-item" key={item.uri} onClick={() => selectTrack(item)}>
                        <img className="search-results-item-img" src={item.albumUrl} alt="" />
                        <div>
                            <h2>{item.title}</h2>
                            <h3>{item.artist}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
        </div>
    )
}
