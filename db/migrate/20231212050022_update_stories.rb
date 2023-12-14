class UpdateStories < ActiveRecord::Migration[7.1]
  def change
    change_column :stories, :topic_id, :bigint, :null => true
  end
end
