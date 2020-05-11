class ChangeDateFieldsOnCompaniesToString < ActiveRecord::Migration[6.0]
  def change
    change_column :companies, :last_return, :string
    change_column :companies, :next_return, :string
  end
end
