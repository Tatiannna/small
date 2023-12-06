# == Schema Information
#
# Table name: stories
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  author_id  :bigint           not null
#  body       :text             not null
#  topic_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Story < ApplicationRecord

    validates :author_id, :topic_id, :title, :body, presence: true

    belongs_to :author,
    class_name: :User

    belongs_to :topic

end
