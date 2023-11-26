import { Component } from "react";
import './sw-wrong-gif.gif';

import './error-boundary.scss';

class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    componentDidCatch (error, infoError) {
        console.log(error, infoError)
        this.setState({
            error: true,
        })
    }

    render () {
        if (this.state.error) {
            return (
                <>
                    <img className="error-boundary-image"
                        src={require('./sw-wrong-gif.gif')}
                        alt="error occur" />
                </>
            )
        }

        return this.props.children;
    }

}

export default ErrorBoundary;