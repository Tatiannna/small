# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  about           :text
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord

    before_validation :ensure_session_token
    validates :username, 
    uniqueness: true, length: { in: 3..40 }
    validates :email, uniqueness: true, length: { in: 3..100 }, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..40 }, allow_nil: true

    has_secure_password

    has_many :stories,
    foreign_key: :author_id,
    class_name: :Story,
    dependent: :destroy

    has_many :responses,
    foreign_key: :user_id,
    class_name: :Response,
    dependent: :destroy

    has_many claps,
    foreign_key: :user_id,
    class_name: :Clap,
    dependent: :destroy

    has_many :clapped_stories,
    through: :claps,
    source: :story

    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)
        
        if @user && @user.authenticate(password)
            @user
        else
            nil
        end
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        save!
        self.session_token
    end
    

    def ensure_session_token
        # if `self.session_token` is already present, leave it be
        # if `self.session_token` is nil, set it to `generate_unique_session_token`
        self.session_token ||= generate_unique_session_token
    end

    private

    def generate_unique_session_token
        # in a loop:
          # use SecureRandom.base64 to generate a random token
          # use `User.exists?` to check if this `session_token` is already in use
          # if already in use, continue the loop, generating a new token
          # if not in use, return the token
        loop do
            token = SecureRandom::urlsafe_base64
            return token if !User.exists?(session_token: token)
        end
    end
      
      
end
