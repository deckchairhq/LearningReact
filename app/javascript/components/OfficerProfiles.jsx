import React from "react";
import OfficerProfile from "./OfficerProfile";

class OfficerProfiles extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                {this.props.officers.map((officer) =>
                    <OfficerProfile key={officer.links.officer.appointments} officer={officer}/>
                )}
            </>
        )
    }

}

export default OfficerProfiles;