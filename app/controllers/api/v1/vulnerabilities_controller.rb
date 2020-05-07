class Api::V1::VulnerabilitiesController < ApplicationController
  def index
    vuln = Vulnerability.all.order(timestamp: :desc).limit(100)
    render json: vuln
  end

  def create
    vuln = Vulnerability.create!(vulnerability_params)
    if vuln
      render json: vuln
    else
      render json: vuln.errors
    end
  end

  def show
    if vulnerability
      render json: vulnerability
    else
      render json: vulnerability.errors
    end
  end

  def destroy
    vulnerability&.destroy
    render json: {message: "Vulnerabilities Deleted!"}
  end

  private
  def vulnerability_params
    params.permit(:name, :score, :notes, :packages, :timestamp)
  end

  def vulnerability
    @vulnerability ||= Vulnerability.find(params[:id])
  end
end
