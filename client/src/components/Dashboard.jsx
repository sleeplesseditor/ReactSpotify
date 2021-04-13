import * as React from 'react';
import useAuth from '../helpers/useAuth';

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = React.useState('');

    return (
        <div>
            <input
                aria-label="Search"
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Songs/Artists"
                type="search"
                value={search}
            />
        </div>
    )
}
