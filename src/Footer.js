import React, { Component } from 'react';

class Footer extends Component {
    timeCopyright() {
        let copy = new Date();
        return copy.getFullYear();
    }

    render() {
        return (
            <footer>
                <div className="alert alert-success notifi" role="alert"> <span className="glyphicon glyphicon-copy"></span> Copy to Clipboard</div>
                <div className="container">
                    <div className="row">
                        <div className="text-center">@enqtran {this.timeCopyright()}</div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;