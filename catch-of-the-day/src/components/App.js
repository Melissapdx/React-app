import React from 'react'
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js'


class App extends React.Component{
	constructor() {
		super();//get intial state

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);

		this.state = {
			fishes: {},
			order: {}
		};
	}
	addFish(fish) {
		//update state
		const fishes = {...this.state.fishes};
		//add in new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		//set state
		this.setState({fishes})
	}

	loadSamples() {
		this.setState ({
		fishes:sampleFishes
		});
	}

	addToOrder(key) {
		//take copy of state
		const order =  {...this.state.order};
		//update or add number of fish
		order[key] = order[key] + 1 || 1;
		//update our state
		this.setState({ order });
	}
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{
							Object.keys(this.state.fishes).map(key => <Fish key={key} index={key}
							details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
						}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order}/>
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)

	}
}

export default App;