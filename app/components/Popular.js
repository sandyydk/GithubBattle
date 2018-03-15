var React = require('react');
var PropTypes = require('prop-types');

class SelectLanguage extends React.Component {
    render() {
        var languages = ['All', 'JavaScript', 'Ruby', 'Java','CSS','Python'];
        return (
            <ul className='languages'>
                    {languages.map(function(lang){
                    return (
                        <li 
                            style = {lang === this.props.selectedLanguage ? { color: '#d0021b'}: null}
                            onClick={this.props.onSelect.bind(null, lang)}
                            key={lang} >
                            {lang}
                        </li>
                    )
                    },this)}
                </ul>
        )
    }
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.function.isRequired
}

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang) {
        this.setState(function() {
            return {
                selectedLanguage: lang
            }
        });
    }
    render() {
        return (
           <div>
               <SelectLanguage 
                selectedLanguage={this.state.selectedLanguage}
                onSelect = {this.updateLanguage}
                />
            </div>
        )
    }
}

module.exports = Popular;