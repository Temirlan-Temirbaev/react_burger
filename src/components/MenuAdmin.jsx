import React from "react";
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";
import propTypes from "prop-types";

class MenuAdmin extends React.Component{

    static propTypes = {
        burgers : propTypes.object,
        deleteBurger : propTypes.func,
        updateBurger : propTypes.func,
        addBurger : propTypes.func,
        loadSampleBurgers : propTypes.func
    }

    render(){
        return <div className="menu-admin">
            <div className="login-header">
                <div className="avatar">
                    <img src='/images/avatar.png' alt="avatar"/>
                </div>
                <button className="buttonLogout" onClick={this.props.handleLogOut}>
                    Выйти
                </button>
            </div>
            <h2>Управление меню</h2>
            {Object.keys(this.props.burgers).map(key => {
                return <EditBurgerForm
                deleteBurger={this.props.deleteBurger} 
                index={key} 
                updateBurger={this.props.updateBurger} key={key} burger={this.props.burgers[key]}/>
            })}
            <AddBurgerForm addBurger={this.props.addBurger}/>
            <button onClick={this.props.loadSampleBurgers}>Загрузить бургеры</button>
        </div>
    }
}

export default MenuAdmin