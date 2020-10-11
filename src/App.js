import React , {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreator from './Redux/action/actions';
import PageBuilder from './container/PageBuilder';
import SelectionBar from './component/SelectionBar/SelectionBar';
import ResultPage from './component/ResultPage/resultPage';
import Ads from './component/Ads/Ads';
import ProductList from './component/ProductList/ProductList';
import ProductDetails from './component/ProductDetails/ProductDetails';
import Cart from './component/Cart/Cart';
import Search from './component/Search/Search';
import Checkout from './component/Checkout/Checkout';
import Login from './component/SignIn/SignIn';
import SignUp from './component/SignUp/SignUp';
import SayHi from './component/SayHi/SayHi';
import cartIcon from './assets/cart.png';
import './App.css';
import Logo from './UI/Logo/Logo';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import NavBar from './component/NavBar/NavBar';
import Profile from './component/Profile/Profile';
import ChangePassword from './component/ChangePassword/ChangePassword';
import Logout from './component/Logout/Logout';
import {BrowserRouter , Route} from 'react-router-dom';
import * as Utility from './utility/utility';

class App extends Component {
  componentDidMount(){
    if(localStorage.getItem('isAuth')){
      this.props.setAuth();
      this.props.setUserInfo(localStorage.getItem('userName'));
    } 
  }

  render(){
    const data = Utility.getAllData();
    const userFullName = this.props.userInfo.firstName;
    const numberOfProducts = this.props.userInfo.cart.length;
    const isAuth = this.props.isAuth;
    return (
      <BrowserRouter>
        <div className="containerr">
            <div className="headerr">
              <Logo></Logo>
              <NavBar isAuth={this.props.isAuth}></NavBar>
              <div className="cart">
                {this.props.isAuth ? 
                <a href="/cart"> 
                  <Badge badgeContent={numberOfProducts} color="secondary">
                    <ShoppingCartIcon style={{ color:'black', 'fontSize':'60px'}}/>
                  </Badge>
                  
                </a> : 
                <a href="/login">  
                  <img href="/cart" className="cartIcon" src={cartIcon} alt="cart"/>
                </a>}
              </div>
            </div>
            <Search></Search>
            <SayHi name={userFullName}></SayHi>
            <PageBuilder>
              
              <SelectionBar></SelectionBar>
              
              <ResultPage>
                {['/','/home','/phone','/acs','/watch','/tablet','/search','/sale'].map(el => 
                  <Route exact path={el} component={ProductList} key={el} />
                )}
                <Route path="/check-out" render={props => {return <Checkout cart={this.props.userInfo.cart}
                addOrder={this.props.addOrder}/>}}/>

                {this.props.isAuth ? (<Route path="/logout" component={Logout} />) : (<Route path="/login" render={()=> 
                <Login setAuth={this.props.setAuth}/>}/>)}

                <Route path="/sign-up" component={SignUp}/>
                <Route path="/profile" render={()=> <Profile data={this.props.userInfo}></Profile>}/>
                <Route path="/change-password" render={() => <ChangePassword data={this.props.userInfo}/>}></Route>
                <Route path="/about-us"/>
                <Route path="/cart" render={(props)=>
                                        <Cart {...props} cancelItem={this.props.removeItem} cart={this.props.userInfo.cart}
                                        isAuth={isAuth} updateCart={this.props.updateCart}/>}/>
                {
                  data.map(product=>{
                      const productCode = Utility.getProductCodeFromUrl(product.url);
                      return <Route path={`/${productCode}-details`} key={productCode}
                                    render={props=>
                                      <ProductDetails {...props} isAuth={this.props.isAuth} data={product} 
                                      addItem={()=>this.props.addItemToCart(productCode)} 
                                      isAddingCart={this.props.ui.isAddingCart} cancelAddingCart={this.props.closeAddingCart} openModal={this.props.openAddingCart} />}/>}
                  )
                }
              </ResultPage>
              <Ads></Ads>
            </PageBuilder>
          </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return{
    ui: state.UI,
    userInfo: state.user,
    isAuth: state.auth.isAuth
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    setAuth: ()=> dispatch(actionCreator.setAuthentication()),
    addItemToCart: (id) => dispatch(actionCreator.addItem(id)),
    removeItem: (id) => dispatch(actionCreator.removeItem(id)),
    addOrder: (data) => dispatch(actionCreator.addOrder(data)),
    removeOrder: id => dispatch(actionCreator.removeOrder(id)),
    openAddingCart: () => dispatch(actionCreator.openAddingCart()),
    closeAddingCart: () => dispatch(actionCreator.cancelAddingCart()),
    setUserInfo: (userName) => dispatch(actionCreator.setUserDataFromServer(userName)),
    updateCart: (cart) => dispatch(actionCreator.updateCart(cart))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
