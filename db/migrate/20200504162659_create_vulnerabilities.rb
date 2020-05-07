class CreateVulnerabilities < ActiveRecord::Migration[6.0]
  def change
    create_table :vulnerabilities do |t|
      t.string :name, null: false
      t.text :packages, null: false
      t.integer :score, null: false, default: 0
      t.integer :timestamp, null: false # Unix timestamp
      t.timestamps
    end
  end
end
