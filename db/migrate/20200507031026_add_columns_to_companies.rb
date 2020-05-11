class AddColumnsToCompanies < ActiveRecord::Migration[6.0]
  def change
    add_column :companies, :company_type, :string
    add_column :companies, :incorporation, :string
    add_column :companies, :sic_1, :string
    add_column :companies, :sic_2, :string
    add_column :companies, :sic_3, :string
    add_column :companies, :sic_4, :string
  end
end
