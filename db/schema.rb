# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_07_031059) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "reg_number"
    t.string "address_1"
    t.string "county"
    t.string "country"
    t.string "category"
    t.string "current_status"
    t.string "accounts_category"
    t.integer "num_gen_partners"
    t.integer "num_lim_partners"
    t.string "ch_uri"
    t.string "last_return"
    t.string "next_return"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "company_type"
    t.string "incorporation"
    t.string "sic_1"
    t.string "sic_2"
    t.string "sic_3"
    t.string "sic_4"
  end

  create_table "vulnerabilities", force: :cascade do |t|
    t.string "name", null: false
    t.integer "score", default: 0, null: false
    t.integer "timestamp", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "packages"
    t.text "notes"
  end

end
