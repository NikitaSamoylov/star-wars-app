import { Component } from "react";

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
                    <h3 className="main-info-right-title">Something went wrong. Please, reload</h3>
                </>
            )
        }

        return this.props.children;
    }

}

export default ErrorBoundary;