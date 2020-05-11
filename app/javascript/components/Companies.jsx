import React from "react";
import DataTable from "./DataTable";
import CompaniesHouseAPI from "../services/CompaniesHouse";

import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    LabelSeries,
    Hint,
    MarkSeries,
} from 'react-vis';

import 'react-vis/dist/style.css';
import OfficerProfiles from "./OfficerProfiles";


class Companies extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: [
                ["name", "Name"],
                ["county", "County"],
                ["accounts_category", "Status"]
            ],
            selectedCompany: null,
            selectedCompanyOfficers: null,
            selectedCompanyPSCs: null,
            selectedCompanyCharges: null,
            selectedCompanyFilingHistory: null,
            companies: []
        };

        this.renderCompanyList = this.renderCompanyList.bind(this)
        this.renderCompanyDetails = this.renderCompanyDetails.bind(this)
        this.updateCompanyDetails = this.updateCompanyDetails.bind(this)
        this.renderSectorAverageChart = this.renderSectorAverageChart.bind(this)
        this.handleSelectedCompanyChange = this.handleSelectedCompanyChange.bind(this)
    }


    componentDidMount() {
        const cat_id = this.props.match.params.cat_id
        const url = `/api/v1/categories/${cat_id}`

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                if (response.length > 0) {
                    this.setState({
                        companies: response
                    })
                    this.handleSelectedCompanyChange(response[0])
                }
            });
    }

    handleSelectedCompanyChange(selectedCompany) {
        this.setState({
            selectedCompany: selectedCompany,
            selectedCompanyOfficers: null
        })
        this.updateCompanyDetails(selectedCompany)
    }

    updateCompanyDetails(company) {
        CompaniesHouseAPI.getCompanyOfficers(company)
            .then(response => response.json())
            .then(response => this.setState({
                    selectedCompanyOfficers: response
                })
            )

        CompaniesHouseAPI.getCompanyPSCs(company)
            .then(response => response.json())
            .then(response => this.setState({
                    selectedCompanyPSCs: response
                })
            )

        CompaniesHouseAPI.getCompanyCharges(company)
            .then(response => response.json())
            .then(response => this.setState({
                    selectedCompanyCharges: response
                })
            )

        CompaniesHouseAPI.getCompanyFilingHistory(company)
            .then(response => response.json())
            .then(response => this.setState({
                    selectedCompanyFilingHistory: response
                })
            )
    }

    renderCompanyList() {
        return (
            <DataTable
                fields={this.state.fields}
                data={this.state.companies}
                highlight={this.state.selectedCompany}
                onHighlightChange={this.handleSelectedCompanyChange}
            />
        )
    }


    generateCard(title, body, state = "success") {
        return (
            <div className={`card text-white text-center bg-${state} mb-3`}>
                <div className="card-body">
                    <h1 className="card-title">{title}</h1>
                    <p className="card-text">{body}</p>
                </div>
            </div>
        )
    }

    renderSectorAverageChart(dataType) {
        let title
        let itemCount

        switch (dataType) {
            case 'officers':
                title = "Avg. Company Officers For Sector"
                itemCount = this.state.selectedCompanyOfficers.active_count
                break;

            case 'pscs':
                title = "Avg. Persons With Significant Control"
                itemCount = this.state.selectedCompanyPSCs.active_count
                break;
        }

        const _highlightActiveItemCount = (data, targetValue) => data.map((vector) => {
            if (targetValue === vector.x) vector.color = '#12939A'
            return vector
        })


        const _generateDummyData = () => {
            return [
                {x: 1, y: 60},
                {x: 2, y: 30},
                {x: 3, y: 20},
                {x: 4, y: 10},
                {x: 5, y: 5},
                {x: 6, y: 4},
                {x: 7, y: 3},
                {x: 8, y: 2},
                {x: 9, y: 2},
                {x: 10, y: 1},
            ]
        }

        const averageDataSet = _highlightActiveItemCount(_generateDummyData(), itemCount)

        const _yTickFormatValue = (v, i, scale, tickTotal) => {
            return `${scale.tickFormat(tickTotal, 's')(v)}%`;
        }

        return (
            <div className="card">
                <div className="card-header">{title}</div>
                <div className="card-body">
                    <XYPlot xType="ordinal"
                            width={300}
                            height={200}
                            xDistance={100}>
                        <VerticalGridLines/>
                        <HorizontalGridLines/>
                        <XAxis/>
                        <YAxis tickFormat={_yTickFormatValue}/>
                        <VerticalBarSeries color="#79C7E3"
                                           colorType="literal"
                                           data={averageDataSet}/>
                        <LabelSeries data={averageDataSet}/>
                    </XYPlot>
                </div>
                <div className="card-footer text-muted">
                    <small>Compared With Sector Avgs.</small>
                </div>
            </div>
        )
    }


    renderFilingTimelineChart() {
        const filingHistory = this.state.selectedCompanyFilingHistory

        if (!filingHistory || !filingHistory.items || !filingHistory.items.length) {
            return (<></>)
        }

        const filingHistoryData = filingHistory.items.map((filing) => {
            return {
                x: new Date(filing.date).getTime(),
                y: (filing.category.charAt(0).toUpperCase() + filing.category.slice(1)).replace(/\-/gi, "\n"),
                color: filing.category,
                label: filing.description.replace(/\-/gi, ' ')
            }
        })

        const _forgetValue = () => {
            this.setState({
                hoverValue: null
            });
        };

        const _rememberValue = value => {
            this.setState({hoverValue: value});
        };

        return (
            <XYPlot xType="time" yType="ordinal" width={700} height={300}>
                <XAxis title="Filing Date"/>
                <YAxis title="Category" width={150}/>
                <MarkSeries
                    colorType={"category"}
                    colorRange={['#59E4EC', '#0D676C', '#EFC1E3', '#B52F93']}
                    colorDomain={filingHistoryData.map((f) => f.y)}
                    onValueMouseOver={_rememberValue}
                    onValueMouseOut={_forgetValue}
                    data={filingHistoryData}
                />
                {this.state.hoverValue ? <Hint
                    value={this.state.hoverValue}
                    format={(v) => [{title: 'Description', value: v.label}]}
                /> : null}
            </XYPlot>
        )
    }


    renderCompanyDetails() {
        const company = this.state.selectedCompany
        const officers = this.state.selectedCompanyOfficers
        const pscs = this.state.selectedCompanyPSCs
        const charges = this.state.selectedCompanyCharges

        return (
            <div>

                <h5 className="card-title">{company.name}</h5>
                <p className="card-text">
                    <small className="text-muted">Reg: {company.reg_number}</small>
                </p>

                <hr/>

                <div className={'card-deck'}>
                    {this.generateCard(
                        officers ? officers.active_count : ' ',
                        "Company Officers"
                    )}

                    {this.generateCard(
                        pscs ? pscs.active_count : 0,
                        "Significant Persons"
                    )}

                    {this.generateCard(
                        charges && charges.total_count ? charges.total_count : 0,
                        "Company Charges",
                        charges && charges.total_count > 0 ? 'danger' : undefined
                    )}
                </div>


                <div className={'card-group'}>
                    {officers ? this.renderSectorAverageChart('officers') : null}
                    {pscs ? this.renderSectorAverageChart('pscs') : null}
                </div>

                <hr/>

                <div className={'filing-timeline'}>
                    <h6>Filing Timeline</h6>
                    {this.renderFilingTimelineChart()}
                </div>

                <hr/>


                <div className="card company-detail-bullets">
                    <div className="card-header">Company Facts</div>

                    <div className="card-body">
                        <div className={'row'}>
                            <div className={'col'}>
                                <dl>
                                    <dt>Accounts Category</dt>
                                    <dd>{company.accounts_category}</dd>

                                    <dt>Company Category</dt>
                                    <dd>{company.category}</dd>

                                    <dt>Address</dt>
                                    <dd>{company.address_1}</dd>
                                    <dd>{company.county} {company.country}</dd>

                                    <dt>Incorporation</dt>
                                    <dd>{company.incorporation}</dd>
                                </dl>
                            </div>

                            <div className={'col'}>
                                <dl>
                                    <dt>Last Return</dt>
                                    <dd>{company.last_return || 'N/A'}</dd>

                                    <dt>Current Status</dt>
                                    <dd>{company.current_status}</dd>

                                    <dt>Category 1</dt>
                                    <dd>{company.sic_1}</dd>

                                    <dt>Category 2</dt>
                                    <dd>{company.sic_2}</dd>

                                    <dt>Category 3</dt>
                                    <dd>{company.sic_3}</dd>

                                    <dt>Category 4</dt>
                                    <dd>{company.sic_4}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <hr/>

                <div>
                    <h3>
                        Active Officers <small className="text-muted">({officers ? officers.active_count : 0})</small>
                    </h3>
                    <OfficerProfiles officers={officers ? officers.items.filter(o => !o.resigned_on) : []}/>

                    <hr/>

                    <h3>
                        Inactive Officers <small
                        className="text-muted">({officers ? officers.resigned_count : 0})</small>
                    </h3>
                    <OfficerProfiles officers={officers ? officers.items.filter(o => o.resigned_on) : []}/>

                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={"row"}>

                <div className={"col company-data-table"}>
                    <div className="card">
                        <div className="card-body">
                            {this.renderCompanyList()}
                        </div>
                        <div className="card-footer text-muted">
                            {this.state.companies.length === 0 ? (
                                "Searching..."
                            ) : (
                                `Found ${this.state.companies.length} Companies`
                            )}
                        </div>
                    </div>
                </div>

                <div className={"col company-detail-container"}>
                    <div className="card">
                        <div className="card-header">Company Profile</div>

                        <div className="card-body">
                            {(this.state.selectedCompany !== null) ? this.renderCompanyDetails() :
                                <span>Loading Company</span>}
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Companies;