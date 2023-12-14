class CreateClaps < ActiveRecord::Migration[7.1]
  def change
    create_table :claps do |t|
      t.references :user, foreign_key: true
      t.references :story, foreign_key: true

      t.timestamps
    end
  end
end
