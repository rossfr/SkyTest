import React from 'react';

class SelectionPanel extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <form>
                    {this.props.items.map((item,i) => <div key={i}><input type="checkbox" name="ckgroup" value={item.product} onChange={this.props.onChange}/>{item.product}<br /></div>)}
                </form>
                <h2>{this.props.footer}</h2>
            </div>
        );
    }
}
export default SelectionPanel;