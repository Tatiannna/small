# == Schema Information
#
# Table name: stories
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  author_id  :bigint           not null
#  body       :text             not null
#  topic_id   :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  detail     :text
#

class Story < ApplicationRecord

    validates :author_id, :title, :body, :topic_id, presence: true

    belongs_to :author,
    class_name: :User

    belongs_to :topic

    has_many :responses,
    dependent: :destroy

end
