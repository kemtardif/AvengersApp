class CreateAvengers < ActiveRecord::Migration[5.2]
  def change
    create_table :avengers do |t|
      t.string :name, null: false
      t.string :legalName, null: false
      t.string :status, null: false

      t.timestamps
    end
  end
end
