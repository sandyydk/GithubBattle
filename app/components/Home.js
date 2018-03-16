var React = require('react');

class Home extends React.Component {
    render() {
        return (
            <div className='home-container'>
                <h1> Github Battle: battle your friends.. and stuff. </h1>

                <Link className='button' to='/battle'>Battle </Link>
            </div>
        )
    }
}


module.exports = Home;