import React from "react";
import {Link} from "react-router-dom";

class Vulnerabilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vulnerabilities: []
        };
    }

    componentDidMount() {
        const url = "/api/v1/vulnerabilities/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({
                vulnerabilities: response
            }))
            .catch(() => this.props.history.push("/"));
    }

    render() {
        const {vulnerabilities} = this.state;

        const allVulnerabilities = vulnerabilities.map((vulnerability, index) => (
            <div key={index} className="col-md-6 col-lg-4">
                <div className="card mb-4">

                    {/*<img src={vulnerability.image}*/}
                    {/*    className="card-img-top"*/}
                    {/*    alt={`${vulnerability.name} image`} />*/}

                    <div className="card-body">
                        <h5 className="card-title">{vulnerability.name}</h5>
                        <ul>
                            <li>Score: {vulnerability.score}</li>
                            <li>Timestamp: {vulnerability.timestamp}</li>
                        </ul>
                        <Link to={`/vulnerability/${vulnerability.id}`} className="btn custom-button">
                            View Vulnerability
                        </Link>
                    </div>

                </div>
            </div>
        ));


        const noVulnerability = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <h4>
                    No vulnerabilities yet. Why not <Link to="/new_vulnerability">create one</Link>
                </h4>
            </div>
        );

        return (
            <>
                <section className="jumbotron jumbotron-fluid text-center">
                    <div className="container py-5">
                        <h1 className="display-4">Vulnerabilities for every type of website</h1>
                        <p className="lead text-muted">
                            We’ve pulled together our most popular vulnerabilities...
                        </p>
                    </div>
                </section>

                <div className="py-5">
                    <main className="container">
                        <div className="text-right mb-3">
                            <Link to="/vulnerability" className="btn custom-button">
                                Create New Vulnerability
                            </Link>
                        </div>
                        <div className="row">
                            {vulnerabilities.length > 0 ? allVulnerabilities : noVulnerability}
                        </div>
                        <Link to="/" className="btn btn-link">
                            Home
                        </Link>
                    </main>
                </div>
            </>
        );
    }

}

export default Vulnerabilities;