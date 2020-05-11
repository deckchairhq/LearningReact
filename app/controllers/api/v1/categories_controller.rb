class Api::V1::CategoriesController < ApplicationController
  def index
    @category = Category.all.order(timestamp: :desc).limit(100)
    render json: @category
  end

  def show
    if cat_id
      # Get companies within category only
      @companies = Company.where("sic_1 LIKE :query", query: "#{cat_id}%").order(name: :asc).limit(100)
      render json: @companies
    else
      raise ActionController::RoutingError.new('Not Found')
    end
  end

  private

  def category
    @category ||= Category.find(params[:id])
  end

  def cat_id
    @cat_id ||= params[:cat_id]
  end
end
