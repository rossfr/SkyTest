import React from 'react';
import SelectionPanel from "./SelectionPanel.jsx"
import BasketPanel from "./BasketPanel.jsx"

class SelectionPanelGroup extends React.Component {
    render() {
        return (
            <div className="container">
                <SelectionPanel className="first" items={this.props.sportData} title={this.props.sportTitle} footer={this.props.sportFooter} onChange={this.props.onSelectionChange}></SelectionPanel>
                <SelectionPanel className="second" items={this.props.newsData} title={this.props.newsTitle} footer={this.props.newsFooter} onChange={this.props.onSelectionChange}></SelectionPanel>
                <BasketPanel className="third" items={this.props.selected} onSubmit = {this.props.onSubmit}/>
            </div>
        );
    }
}
export default SelectionPanelGroup;