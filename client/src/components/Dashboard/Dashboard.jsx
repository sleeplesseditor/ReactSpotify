import * as React from 'react';
import useAuth from '../../helpers/useAuth';
import './dashboard.scss';

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = React.useState('');

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
        </div>
    )
}
