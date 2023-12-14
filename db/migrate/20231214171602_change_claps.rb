class ChangeClaps < ActiveRecord::Migration[7.1]
  def change
    add_index :claps, [:user_id, :story_id], unique:true
  end
end
