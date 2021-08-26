import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './App.css';
import ErrorBoundry from './ErrorBoundry';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => { return response.json(); })
            .then(users => { this.setState({ robots: users }); })
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })

    }

    render() {
        const filterRobots = this.state.robots.filter(robots => {
            return robots.name.toLocaleLowerCase().includes(this.state.searchfield.toLocaleLowerCase());
        })
        if (this.state.robots.length === 0) {
            return <h1 className='tc'>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f2'>RobotFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                        <CardList robots={filterRobots} />
                        </ErrorBoundry>
                        
                    </Scroll>
                </div>
            )
        }
    }
}

export default App;