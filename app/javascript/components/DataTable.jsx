import React from "react";

class DataTable extends React.Component {

    constructor(props) {
        super(props)
        this.onRowSelect = this.onRowSelect.bind(this)
        this.generateHeaderCells = this.generateHeaderCells.bind(this)
        this.generateBodyRows = this.generateBodyRows.bind(this)
        this.generateBodyCells = this.generateBodyCells.bind(this)
    }

    onRowSelect(rowData) {
        this.props.onHighlightChange(rowData)
    }

    generateHeaderCells() {
        return this.props.fields.map((field, idx) => {
            return <th key={idx} scope={"col"}>{field[1]}</th>
        })
    }

    generateBodyRows() {
        return this.props.data.map((rowData, idx) => {
            return (
                <tr onClick={() => this.onRowSelect(rowData)}
                    key={idx}
                    className={`${rowData == this.props.highlight ? 'highlight' : ''}`}>
                    {this.generateBodyCells(rowData)}
                </tr>
            )
        })
    }

    generateBodyCells(rowData) {
        return this.props.fields.map((field, idx) => {
            return <td key={idx}>{rowData[field[0]]}</td>
        })
    }

    render() {
        return (
            <>
                <table className={"table table-striped table-sm"}>
                    <thead className={"thead-dark"}>
                    <tr>{this.generateHeaderCells()}</tr>
                    </thead>
                    <tbody>
                    {this.generateBodyRows()}
                    </tbody>
                </table>
            </>
        )
    }
}

export default DataTable;