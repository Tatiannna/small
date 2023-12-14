# == Schema Information
#
# Table name: claps
#
#  id         :bigint           not null, primary key
#  user_id    :bigint
#  story_id   :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Clap < ApplicationRecord

    validates :user_id, :story_id, presence: true

    belongs_to :user

    belongs_to :story
end
