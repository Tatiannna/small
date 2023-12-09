class CreateResponses < ActiveRecord::Migration[7.1]
  def change
    create_table :responses do |t|
      t.references :user, foreign_key: true, null: false
      t.references :story, foreign_key: true, null: false
      t.references :parent_response, foreign_key: {to_table: :responses}
      t.text :body, null:false

      t.timestamps
    end
  end
end
