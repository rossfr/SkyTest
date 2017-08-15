import React from 'react';
import {Route} from 'react-router';
import SelectionPanelGroup from "./SelectionPanelGroup.jsx";
import ConfirmPanel from './ConfirmPanel.jsx';
import axios from 'axios';

const SPORTS_CATEGORY = "Sports";
const NEWS_CATEGORY = "News";

class App extends React.Component {


    constructor () {
        super();
        //we are assuming that customerID has been already populated from a cookie
        //this is the only part of the app that uses state to preserve a single point of truth
        this.state = {
            customerID: 1234,
            userlocation : "",
            sportTitle:"Sports",
            sportFooter:"",
            catalogue:[
            ],
            newsTitle:"News",
            newsFooter:"News",
            selected:[]
        }

    }

    componentDidMount() {
        this.init();
    }

    init() {
        //make a request to the node server

        axios.get('http://localhost:8081/CustomerLocation?id='+this.state.customerID).then((response) =>
        {
            this.state.userlocation = response.data.location;
            //set the state manually as we don't want a reaction to the state change yet
            this.getCat();
        })
    }

    getCat () {
        axios.get('http://localhost:8081/CatalogueService?location='+this.state.userlocation).then((response) =>
        {
            this.setState({ catalogue: response.data});
        })

    }

    
    onSubmit () {
        console.log("submitting the form");
        axios.get('http://localhost:8081/SubmitBasket?basket='+this.state.selected).then((response) =>
        {
            window.location = "#/confirm";
            //this.setState({ catalogue: response.data});
        })
        
        
        window.location = "#/confirm";
    }

    onSelectionChange (e) {
        //first decide if this is on or off
        if(e.target.checked){
            if(this.state.selected.indexOf(e.target.value) === -1){
                this.state.selected.push(e.target.value)
            }
        }else{
            var ind = this.state.selected.indexOf(e.target.value);
            if( ind !== -1){
                this.state.selected.splice(ind,1);
            }
        }
        this.forceUpdate(); //as we have modified state directly
    }

    selectGroup ()  {
        return (
            <SelectionPanelGroup sportData = {this.state.catalogue.filter((o)=> o.category === SPORTS_CATEGORY)}
                                 newsData ={this.state.catalogue.filter((o)=> o.category === NEWS_CATEGORY)}
                                 sportTitle ={this.state.sportTitle}
                                 newsTitle={this.state.newsTitle}
                                 selected={this.state.selected}
                                 onSelectionChange ={this.onSelectionChange.bind(this)}
                                 onSubmit = {this.onSubmit.bind(this)}
            />
        );
    }

    confirmScreen () {
        return (
            <ConfirmPanel items={this.state.selected} />
        );

    }

 // <Route path="/confirm" render = {this.confirmScreen.bind(this)} />

    render() {
        return (
            <div>
                <div id="topbar" >
                    top panel
                </div>
                <div>
                    <Route exact path='/' render = {this.selectGroup.bind(this)}  />
                    <Route exact path='/confirm' render = {this.confirmScreen.bind(this)} />
                </div>
                <div id="footer" >
                    bottom panel
                </div>
            </div>
        );
    }
}

export default App;