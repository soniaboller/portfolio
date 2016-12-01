var React = require('react');
var ReactDOM = require('react-dom');

var About = React.createClass({
    getInitialState: function(){
        return {
            showAbout: false
        }
    },
    showAbout: function(){
        var state = this.state;
        state.showAbout = !state.showAbout;
        this.setState(state)

    },
    render: function(){
        return(
            <div id="about">
            <button onClick={this.showAbout}>ABOUT</button>
            {this.state.showAbout ? <AboutPage/> : null}
            </div>
        )
    }
});

var AboutPage = React.createClass({
    render: function(){
        return(
            <div>
                <div>hi</div>
            </div>
        )
    }
})

ReactDOM.render(<About/>,document.getElementById('information'));