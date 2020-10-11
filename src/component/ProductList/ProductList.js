import React, {Component} from 'react';
import classes from './product-list.module.css';
import Product from './Product/Product';
import * as Utility from '../../utility/utility';
import Programs from '../BigProduct/BigProduct';
import Pagination from '@material-ui/lab/Pagination';


const numberOfProductsEachPage = 8;

class ProductList extends Component {
    state = {
        currentPage: 1
    }
    componentDidMount(){
        console.log(this.props);
    }
    handlePage = (e, value) =>{
        this.setState({
            currentPage: value
        })
    }
    render(){
        let data = null;
        let programs = null;
        if(this.props.match.path === '/search'){
            const allData = [...Utility.getAllData()];
            data = allData.filter(el => el.title.toLowerCase().includes(this.props.location.search.toLowerCase().slice(1)));
        }else if(this.props.match.path === '/' || this.props.match.path === '/home'){
            programs = (<Programs/>);
            data = require(`../../data/phone-data.json`);
        }else if(this.props.match.path === '/sale'){
            const allData = [...Utility.getAllData()];
            data = allData.filter(product => product.oldPrice !== null);
        }else{ 
            data = require(`../../data${this.props.match.path}-data.json`);
        }
        const pageNum = Math.floor(data.length/numberOfProductsEachPage);
        data = data.slice((this.state.currentPage-1)*numberOfProductsEachPage, (this.state.currentPage)*numberOfProductsEachPage);
        return(
            <React.Fragment>
                {programs}
                <div className={classes.ProductList}>
                    {data.map(product=>{
                        return <Product key={Utility.getProductCodeFromUrl(product.url)} data={product} ></Product>
                    })}
                </div>
                <Pagination style={{textAlign: "center"}} count={pageNum} page={this.state.currentPage} onChange={this.handlePage}/>
            </React.Fragment>
        );
    }
}

export default ProductList;