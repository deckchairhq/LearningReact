import React from "react";
import {css} from "@emotion/core";
import {GridLoader} from "react-spinners";
import CompaniesHouseAPI from "../services/CompaniesHouse";

import {RadialChart, LabelSeries} from "react-vis";

class OfficerProfile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            appointments: null
        }

        this.fetchOfficerAppointments = this.fetchOfficerAppointments.bind(this)
        this.renderOfficerAppointmentsChart = this.renderOfficerAppointmentsChart.bind(this)

        this.fetchOfficerAppointments()
    }

    renderStatusBadge(active) {
        if (active) {
            return (
                <span className="badge badge-success">Active</span>
            )
        } else {
            return (
                <span className="badge badge-danger">Resigned</span>
            )
        }
    }


    fetchOfficerAppointments() {
        CompaniesHouseAPI.getOfficerAppointments(this.props.officer)
            .then(response => response.json())
            .then(response => {
                    this.setState({
                        appointments: response
                    })
                }
            )
    }

    renderOfficerAppointmentsChart() {
        const appointments = this.state.appointments

        if (!appointments || !appointments.items || !appointments.items.length) {
            return (<></>)
        }

        const appointmentData = appointments.items.map((appointment) => {
            return {
                angle: 360 / appointments.items.length,
                label: appointment.appointed_to.company_name
            }
        })

        return (
            <RadialChart
                data={appointmentData}
                radius={40}
                innerRadius={30}
                padAngle={0.05}
                width={90}
                height={90}
                style={{margin: 'auto'}}>
                <LabelSeries
                    labelAnchorX='middle'
                    labelAnchorY='middle'
                    yOffset={-12}
                    data={[{
                        x: 0,
                        y: 0,
                        label: appointmentData.length.toString(), style: {
                            fontSize: '24px',
                            fontWeight: 'bolder',
                            textAnchor: 'middle'
                        }
                    }]}
                />
            </RadialChart>
        )
    }

    render() {
        const officer = this.props.officer
        const appointments = this.state.appointments

        let first_name = officer.name.split(' ')[0].trim()
        let last_name = ''

        if (officer.name.indexOf(',') >= 0) {
            first_name = officer.name.split(',')[1].split(' ')[0].trim()
            last_name = officer.name.split(',')[0].trim()
        }


        return (
            <div className="card" key={officer.links.officer.appointments}>
                <div className="card-body">

                    <div className="row ">

                        <div className="col-7">
                            <h5 className="card-title">{officer.name} {this.renderStatusBadge(officer.resigned_on ? false : true)}</h5>
                            <small className="officer-metadata card-subtitle mb-2 text-muted">
                                {officer.officer_role || officer.occupation} -&nbsp;
                                Appointed: {officer.appointed_on}&nbsp;
                                {officer.resigned_on ? `Resigned: ${officer.resigned_on}` : ''}
                            </small>

                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere, lacus in tristique scelerisque, mi quam malesuada ante, quis dapibus neque risus non mi. Nunc et viverra lorem, at consequat odio.</p>

                            <a target="_blank"
                               href={`https://www.linkedin.com/pub/dir/${first_name}/${last_name}`}
                               className="card-link btn-secondary btn-sm">Search LinkedIn</a>
                        </div>

                        <div className="col-5 officer-details">
                            <div className="card">
                                <div className="card-header">
                                    Other Appointments
                                </div>

                                <div className={"center-child"}>
                                    <GridLoader
                                        size={15}
                                        color={"#79C7E3"}
                                        loading={!this.state.appointments}
                                    />
                                </div>

                                <div className="card-body center-child">
                                    {this.renderOfficerAppointmentsChart()}
                                </div>

                                <ul className="list-group list-group-flush">
                                    {appointments ? appointments.items.map((appointment) => {
                                        return (
                                            <li key={appointment.appointed_to.company_number + appointment.officer_role} className="list-group-item">
                                                <small className={'small'}>
                                                    {appointment.appointed_to.company_name} - ({appointment.officer_role})
                                                </small>
                                            </li>
                                        )
                                    }) : null}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>)
    }

}

export default OfficerProfile;