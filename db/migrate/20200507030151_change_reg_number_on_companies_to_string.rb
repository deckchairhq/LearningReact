class ChangeRegNumberOnCompaniesToString < ActiveRecord::Migration[6.0]
  def change
    change_column :companies, :reg_number, :string
  end
end
