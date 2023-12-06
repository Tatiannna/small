class ChangeStories < ActiveRecord::Migration[7.1]
  def change
    add_column :stories, :detail, :text
  end
end
