import React from 'react';
import { Link } from 'react-router';

class User extends React.Component {
    constructor() {
        super();
        this.state = {
        user: []    
        };
    }

    componentDidMount() {
        fetch(`https://api.github.com/users/${this.props.params.username}`)
        .then(response => response.json())
        .then(
            user => {
                this.setState({
                    user: [user]
                });
            }
        );
        
        fetch(`https://api.github.com/users/${this.props.params.username}/repos`)
        .then(response => response.json())
        .then(
            repos => {
                this.setState({
                    repos: repos
                });
            }
        );
    }
    
    renderStat(stat) {
        console.log(stat);
        return (
            <li key={stat.name} className="user-info__stat">
                <Link to={stat.url}>
                    <p className="user-info__stat-value">{stat.value}</p>
                    <p className="user-info__stat-name">{stat.name}</p>
                </Link>
            </li>
        );
    }

    render() {
        
        if (!this.state.user) {
            return (<div className="user-page">LOADING...</div>);
        }

        const user = this.state.user;

        const stats = [
            {
                name: 'Public Repos',
                value: user.public_repos,
                url: `/user/${this.props.params.username}/repos`
            },
            {
                name: 'Followers',
                value: user.followers,
                url: `/user/${this.props.params.username}/followers`
            },
            {
                name: 'Following',
                value: user.following,
                url: `/user/${this.props.params.username}/following`
            }
        ];

        console.log(this.state.user);

        return (
            <div className="user-page">
                <div className="user-info">
                    <Link className="user-info__text" to={`/user/${user.login}`}>
                        <img className="user-info__avatar" src={user.avatar_url} alt={`${user.login} avatar`}/>
                        <h2 className="user-info__title">{user.login} ({user.name})</h2>
                        <p className="user-info__bio">{user.bio}</p>
                    </Link>

                    {/* <ul className="user-info__stats">
                        {stats.map(this.renderStat)}
                    </ul> */}
                    </div>
                    {this.state.repos.map(repo => {
                  console.log(repo)
                  return <div>{repo.name}:{repo.html_url}</div>
                })}
            </div>
        );
    }
};

export default User;
