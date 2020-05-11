class CreateCompanies < ActiveRecord::Migration[6.0]
  def change
    create_table :companies do |t|
      t.string :name
      t.integer :reg_number
      t.string :address_1
      t.string :county
      t.string :country
      t.string :category
      t.string :current_status
      t.string :accounts_category
      t.integer :num_gen_partners
      t.integer :num_lim_partners
      t.string :ch_uri
      t.integer :last_return
      t.integer :next_return

      t.timestamps
    end
  end
end
