import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreator from '../../Redux/action/actions';

class Logout extends Component{
    async componentDidMount(){
        localStorage.removeItem('token');
        await this.props.logout();
    }
    render () {
        return <Redirect to="/login"/>
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        logout: ()=>dispatch(actionCreator.logout())
    }
  }

export default connect(null,mapDispatchToProps)(Logout);