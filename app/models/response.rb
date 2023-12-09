# == Schema Information
#
# Table name: responses
#
#  id                 :bigint           not null, primary key
#  user_id            :bigint           not null
#  story_id           :bigint           not null
#  parent_response_id :bigint
#  body               :text             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class Response < ApplicationRecord
    validates :user_id, :user_id, :body, presence: true

    belongs_to :author,
    foreign_key: :user_id,
    class_name: :User

    belongs_to :story
end
