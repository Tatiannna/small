# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end
    
    topics = [
      "Technology Trends",
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
      "Mobile App Development",
      "Data Science",
      "Cybersecurity",
      "Blockchain",
      "Virtual Reality",
      "Augmented Reality",
      "Internet of Things (IoT)",
      "Cloud Computing",
      "Programming Languages",
      "Software Engineering",
      "UX/UI Design",
      "Product Management",
      "Startup Stories",
      "Entrepreneurship",
      "Digital Marketing",
      "Social Media Strategies",
      "Content Marketing",
      "E-commerce",
      "Cryptocurrency",
      "FinTech",
      "Health Tech",
      "Space Exploration",
      "Science and Innovation",
      "Environmental Sustainability",
      "Climate Change Solutions",
      "Renewable Energy",
      "Travel Adventures",
      "Food and Cooking",
      "Fitness and Wellness",
      "Mental Health",
      "Personal Development",
      "Career Advice",
      "Book Reviews",
      "Movie Reviews",
      "Music Discoveries",
      "Art and Creativity",
      "Photography",
      "Fashion Trends",
      "Gaming",
      "Sports and Fitness",
      "Parenting Tips",
      "Education and Learning",
      "History and Culture",
      "Philosophy",
      "Self-Help",
      "Inspirational Stories"
    ]

    topics.each do |topic|
      Topic.create!(
      name: topic, 
    )
    end

    puts "Done!"
    
  end