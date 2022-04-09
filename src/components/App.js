import React from "react";
import propTypes from 'prop-types'
import Header from "./Header";
import Order from "./Order";
import firebase from "firebase";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from '../sample-burgers'
import Burger from './Burger';
import base from "../base";
import SignIn from "./Auth/SignIn";
class App extends React.Component{

    static propTypes = {
        match : propTypes.object
    }

    state = {
        burgers : {},
        order : {}
    }
    componentDidMount(){
        const {params} = this.props.match;
        const localStorageRef = localStorage.getItem(params.restaurantId)
        if(localStorageRef) this.setState({order : JSON.parse(localStorageRef)})
        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context : this,
            state : 'burgers'
        });
    
    };
    componentWillUnmount(){
        base.removeBinding(this.ref)
    };

    componentDidUpdate(){
        const {params} = this.props.match
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order))        
    };

    loadSampleBurgers = () => {
        this.setState({burgers : sampleBurgers})
    };

    addBurger = burger => {
        const burgers = {...this.state.burgers}
        burgers[`burger${Date.now()}`] = burger
        this.setState({burgers})
    };

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1
        this.setState({order})
    };
    deleteFromOrder = key => {
        const order = {...this.state.order};
        delete order[key]
        this.setState({order})
    };
    updateBurger = (key, updatedBurger) => {
        const burgers = {...this.state.burgers}
        burgers[key] = updatedBurger
        this.setState({burgers})
    };
    deleteBurger = key => {
        const burgers = {...this.state.burgers};
        burgers[key] = null;
        this.setState({burgers});
    };

    handleLogOut = async () => {
        await firebase.auth().signOut()
        window.location.reload();
    }

    render(){
        return  <SignIn><div className="burger-paradise">
                <div className="menu">
                    <Header title="Hot Burgers"/>
                    <ul className="burgers">
                        {Object.keys(this.state.burgers).map(key => {
                            return <Burger addToOrder={this.addToOrder} key={key} index={key} details={this.state.burgers[key]}/>
                        })}                     
                    </ul>
                </div>
                <Order
                deleteFromOrder={this.deleteFromOrder}
                burgers={this.state.burgers} order={this.state.order}/>
                <MenuAdmin
                 updateBurger={this.updateBurger} 
                 burgers={this.state.burgers} 
                 loadSampleBurgers={this.loadSampleBurgers} 
                 addBurger={this.addBurger}
                 deleteBurger={this.deleteBurger}
                 handleLogOut={this.handleLogOut}
                 />
            </div>
        </SignIn>
    }
}

export default App