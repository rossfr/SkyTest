import React from 'react';

class BasketPanel extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <form>
                    {this.props.items.map((item,i) => <div key={i}>{item}<br /></div>)}
                    <input type="button" value="Checkout" onClick={this.props.onSubmit} />
                </form>
                <h2>{this.props.footer}</h2>
            </div>
        );
    }
}
export default BasketPanel;