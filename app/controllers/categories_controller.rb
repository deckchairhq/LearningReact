# SELECT sic_1, COUNT(sic_1) from Companies WHERE current_status = 'Active' GROUP BY sic_1 ORDER BY count DESC;

class CategoriesController < ApplicationController
  def index
    # This is a terrible query, just for example though...
    @categories = Company.where(:current_status => 'Active').select("sic_1, COUNT(sic_1)").group(:sic_1).order(count: :desc)

    # @Companies = Company.where(:sic_1 => params[:category_str]).paginate(page: params[:page], per_page: 100)
    # @Companies = Company.all.limit(100)
      # .order(timestamp: :desc)
  end
  # SELECT current_status, accounts_category, COUNT(accounts_category) from Companies GROUP BY current_status, accounts_category;

  def show
    if cat_id
      # Get companies within category only
      # @companies = Company.where("sic_1 LIKE :query", query: "#{cat_id}%").order(name: :asc)
    else
      raise ActionController::RoutingError.new('Not Found')
    end
  end

  def cat_id
    @cat_id ||= params[:cat_id]
  end
end
