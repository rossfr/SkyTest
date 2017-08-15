import React from 'react';
import axios from 'axios';

class ConfirmPanel extends React.Component {
    
    constructor (){
        super();
        this.state = {
            basket: []
        }
    }
    
    
    render() {
        return (
            <div>
               <h1> Confirm Page stub </h1>
                {this.state.basket.map((item,i) => <div key={i}>{item}<br /></div>)}
                <br />
            </div>
        );
    }

    componentDidMount() {
        this.init();
    }

    init(){
        axios.get('http://localhost:8081/GetBasket').then((response) =>
        {
            let basket = response.data.split(',');
            this.setState({ basket: basket});
        })
    }
}
export default ConfirmPanel;
