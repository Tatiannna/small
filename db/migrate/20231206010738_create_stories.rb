class CreateStories < ActiveRecord::Migration[7.1]
  def change
    create_table :stories do |t|
      t.string :title, null: false 
      t.references :author, null: false, foreign_key: {to_table: :users}
      t.text :body, null: false
      t.references :topic, null: false, foreign_key: true

      t.timestamps
    end
  end
end
