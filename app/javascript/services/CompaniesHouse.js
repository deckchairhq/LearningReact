// Static API Class
class CompaniesHouseAPI {
    static API_KEY = 'VVg4akxaaWctOUdmd09EOVk5WGlHc2x4TWhXaG9Gb3ZfWkNGNG1DWg'
    static BASE_URL = 'https://api.companieshouse.gov.uk/'

    static _callApi(path) {
        const url = CompaniesHouseAPI.BASE_URL + path
        const params = {
            cors: true,
            headers: {'Authorization': 'Basic ' + btoa(atob(CompaniesHouseAPI.API_KEY) + ':')}
        }
        return fetch(url, params)
    }

    static getCompanyOfficers(company) {
        const url = `company/${company.reg_number}/officers`
        return CompaniesHouseAPI._callApi(url)
    }

    static getCompanyPSCs(company) {
        const url = `company/${company.reg_number}/persons-with-significant-control`
        return CompaniesHouseAPI._callApi(url)
    }

    static getCompanyCharges(company) {
        const url = `company/${company.reg_number}/charges`
        return CompaniesHouseAPI._callApi(url)
    }

    static getCompanyFilingHistory(company) {
        const url = `company/${company.reg_number}/filing-history`
        return CompaniesHouseAPI._callApi(url)
    }

    static getOfficerAppointments(officer) {
        const url = officer.links.officer.appointments.slice(1)
        return CompaniesHouseAPI._callApi(url)
    }

}

export default CompaniesHouseAPI;