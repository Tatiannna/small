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

    Clap.destroy_all
    Response.destroy_all
    Story.destroy_all
    Topic.destroy_all
    User.destroy_all

  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('topics')
    ApplicationRecord.connection.reset_pk_sequence!('stories')
    ApplicationRecord.connection.reset_pk_sequence!('responses')
    ApplicationRecord.connection.reset_pk_sequence!('claps')


  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'DemoUser', 
      email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    100.times do 
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
      "UX|UI Design",
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


    puts "Creating topics..."

    topics.each do |topic|
      Topic.create!(
      name: topic, 
    )
    end

    # puts "Creating stories..."
    # 138.times do
    #   story = {
    #     title: Faker::Lorem.sentence.chop,
    #     author_id: rand(1..100),
    #     body: Faker::Lorem.paragraphs(number: rand(5..10)).join(' '),
    #     topic_id: rand(1..50),
    #     detail: Faker::Lorem.sentence
    #   }

    #   Story.create!(story)
    # end

    stories = [
      {
        title: "Revolutionizing Health Tech: Advancements in Digital Wellness",
        author_id: rand(1..100),
        body: "Explore the groundbreaking innovations in health tech that are transforming the landscape of digital wellness. From wearable devices that monitor vital signs to AI-driven health apps, this story delves into the intersection of technology and healthcare. Discover how these advancements empower individuals to take control of their well-being and revolutionize the way we approach personal health. Join the journey of digital wellness and uncover the potential of technology in fostering healthier lifestyles and improving overall healthcare outcomes.",
        topic_id: topics.index("Health Tech") + 1,
        detail: "Advancements in digital wellness."
      },

      {
        title: "Unlocking the Secrets of Renewable Energy: A Sustainable Future",
        author_id: rand(1..100),
        body: "Embark on a journey into the world of renewable energy and discover the sustainable solutions reshaping our energy landscape. This story explores solar power, wind energy, and other renewable sources that hold the key to a greener and more sustainable future. Dive into the challenges and triumphs of harnessing clean energy and mitigating the impacts of climate change. Join the movement towards a world powered by renewable resources and explore the innovations driving the transition to a more eco-friendly energy paradigm.",
        topic_id: topics.index("Renewable Energy") + 1,
        detail: "A sustainable future powered by renewable energy."
      },

      {
        title: "The Art of Data Science: Unraveling Insights from Big Data",
        author_id: rand(1..100),
        body: "Delve into the artistry of data science as we unravel insights from the vast landscapes of big data. This story explores the methodologies and tools used to extract meaningful information from large datasets. From machine learning algorithms to predictive analytics, discover the transformative power of data science in various domains. Explore real-world applications, challenges, and the impact of data-driven decision-making. Join the data science revolution and unlock the potential of big data in driving innovation and solving complex problems.",
        topic_id: topics.index("Data Science") + 1,
        detail: "Unraveling insights from the vast landscapes of big data."
      },

      {
        title: "Exploring the Frontiers of Artificial Intelligence",
        author_id: rand(1..100),
        body: "Journey into the frontiers of artificial intelligence (AI), where machines learn, reason, and adapt to complex tasks. This story explores the latest advancements in AI, from natural language processing to computer vision. Delve into the ethical considerations surrounding AI and its potential impact on society. Explore real-world applications, breakthroughs, and the ongoing quest to create intelligent systems that mimic human cognition. Join the exploration of AI's frontiers and witness the transformative potential of this rapidly evolving field.",
        topic_id: topics.index("Artificial Intelligence") + 1,
        detail: "Exploring the frontiers of artificial intelligence."
      },

      {
        title: "Digital Marketing Evolution: Navigating the Modern Landscape",
        author_id: rand(1..100),
        body: "Navigate the ever-evolving landscape of digital marketing and explore the strategies reshaping the way businesses connect with their audience. This story delves into the latest trends, tools, and platforms that define modern digital marketing. From social media strategies to content marketing innovations, discover the dynamic ecosystem that drives online engagement. Uncover the challenges and opportunities faced by marketers in the digital age and gain insights into building effective digital marketing campaigns. Join the evolution of digital marketing and stay ahead in the competitive online marketplace.",
        topic_id: topics.index("Digital Marketing") + 1,
        detail: "Navigating the modern landscape of digital marketing."
      }, 
      {
        title: "Cybersecurity Chronicles: Defending the Digital Frontier",
        author_id: rand(1..100),
        body: "Embark on a thrilling journey into the realm of cybersecurity, where defenders stand guard against digital threats in the ever-evolving landscape of the internet. This story delves into the challenges faced by cybersecurity experts, from protecting sensitive data to thwarting cyber attacks. Explore the strategies employed to secure networks, detect vulnerabilities, and respond to emerging threats. Join the ranks of cyber guardians as we unravel the tales of defenders who work tirelessly to safeguard the digital frontier.",
        topic_id: 6, # Cybersecurity
        detail: "Defending the digital frontier."
      },

      {
        title: "AI and Ethics: Navigating the Moral Landscape",
        author_id: rand(1..100),
        body: "As artificial intelligence continues to advance, questions of ethics and morality become central to its development and deployment. This story explores the ethical considerations surrounding AI, from algorithmic bias to the societal impact of automation. Delve into the discussions on responsible AI and the need for guidelines that ensure AI technologies align with human values. Navigate the moral landscape of AI development and ponder the implications of creating intelligent systems with a sense of ethical responsibility.",
        topic_id: 2, # Artificial Intelligence
        detail: "Navigating the moral landscape of AI."
      },

      {
        title: "The Language of Code: Exploring Programming Paradigms",
        author_id: rand(1..100),
        body: "Dive into the intricate world of programming languages and explore the diverse paradigms that shape the way we write code. This story takes you on a journey through imperative, functional, and object-oriented programming, unraveling the strengths and weaknesses of each paradigm. From the simplicity of procedural code to the elegance of functional programming, discover the languages that define the digital landscape. Explore the evolution of programming paradigms and the impact they have on software development practices.",
        topic_id: 12, # Programming Languages
        detail: "Exploring the paradigms of programming languages."
      },

      {
        title: "Beyond Earth: The Promise of Space Colonization",
        author_id: rand(1..100),
        body: "Venture beyond the confines of our home planet and explore the promise of space colonization. This story envisions a future where humans establish colonies on celestial bodies, from the moon to Mars and beyond. Delve into the technological challenges of creating sustainable habitats in space and the potential benefits of human expansion beyond Earth. Join the cosmic pioneers as they push the boundaries of space exploration and lay the groundwork for the next chapter in human history.",
        topic_id: 26, # Space Exploration
        detail: "The promise of space colonization."
      },

      {
        title: "The Art of Design: Crafting Digital Experiences",
        author_id: rand(1..100),
        body: "Enter the realm of user experience (UX) and user interface (UI) design, where digital experiences are meticulously crafted to delight and engage users. This story explores the principles of effective design, from understanding user behavior to creating visually appealing interfaces. Dive into the iterative process of prototyping, testing, and refining designs to enhance usability and aesthetics. Discover the artistry behind crafting digital experiences that leave a lasting impression on users and contribute to the success of digital products and services.",
        topic_id: 14, # UX/UI Design
        detail: "Crafting digital experiences with UX/UI design."
      }, 


  {
    title: "Journey Through the Digital Wilderness",
    author_id: rand(1..100),
    body: "Embark on a virtual expedition through the vast digital wilderness, where technology shapes landscapes and defines the modern human experience. This story navigates the realms of cyberspace, exploring the impact of digitalization on society, communication, and individual lives. From the advent of the internet to the evolution of social media, witness the transformative journey of humanity in the digital age. Uncover the challenges and opportunities presented by the digital wilderness and examine the role of individuals in navigating this dynamic and interconnected world.",
    topic_id: 1, # Technology Trends
    detail: "Navigating the digital landscape."
  },

  {
    title: "Beyond the Screen: Immersive Virtual Reality",
    author_id: rand(1..100),
    body: "Step beyond the confines of reality and immerse yourself in the fascinating realm of virtual reality. This story explores the evolution of VR technology, from early experiments to cutting-edge experiences that blur the lines between the physical and virtual worlds. Dive into virtual landscapes, interact with digital environments, and witness the potential of VR in fields ranging from gaming to education. Delve into the challenges of creating realistic and immersive VR experiences and anticipate the future possibilities that await in the realm of virtual reality.",
    topic_id: 9, # Virtual Reality
    detail: "Exploring the boundaries of virtual experiences."
  },

  {
    title: "Blockchain Revolution: Decentralizing Trust",
    author_id: rand(1..100),
    body: "Enter the revolutionary world of blockchain technology, a decentralized ledger that has the power to transform industries and redefine trust in transactions. This story unravels the principles of blockchain, exploring its applications beyond cryptocurrencies. From smart contracts to supply chain transparency, witness the impact of blockchain on various sectors. Dive into the challenges and opportunities presented by this groundbreaking technology, and envision a future where trust is distributed across a global network of interconnected nodes.",
    topic_id: 7, # Blockchain
    detail: "Decentralizing trust through blockchain."
  },

  {
    title: "Epicurean Adventures: Culinary Tales from Around the Globe",
    author_id: rand(1..100),
    body: "Embark on an epicurean journey as we traverse the diverse culinary landscapes of the world. This story invites you to savor the flavors, aromas, and cultural stories behind signature dishes from different regions. From street markets in Southeast Asia to Michelin-starred restaurants in Europe, indulge in the richness of global gastronomy. Explore the history and traditions that shape culinary identities, and discover the ways in which food acts as a universal language, connecting people across borders and cultures.",
    topic_id: 29, # Food and Cooking
    detail: "Indulging in global culinary delights."
  },

  {
    title: "Innovations in Health Tech: Transforming Healthcare",
    author_id: rand(1..100),
    body: "Navigate the landscape of health tech innovations that are reshaping the healthcare industry. This story explores breakthrough technologies, from telemedicine and wearable devices to artificial intelligence in diagnostics. Witness the transformative impact of data-driven healthcare solutions and their potential to improve patient outcomes. Delve into the ethical considerations and challenges that accompany the integration of technology into healthcare practices. Join the journey of innovation in health tech and envision a future where technology enhances the quality and accessibility of healthcare services.",
    topic_id: 25, # Health Tech
    detail: "Transforming healthcare through technology."
},
  {
    title: "Journey Through the Digital Wilderness",
    author_id: rand(1..100),
    body: "Embark on a virtual expedition through the vast digital wilderness, where technology shapes landscapes and defines the modern human experience. This story navigates the realms of cyberspace, exploring the impact of digitalization on society, communication, and individual lives. From the advent of the internet to the evolution of social media, witness the transformative journey of humanity in the digital age. Uncover the challenges and opportunities presented by the digital wilderness and examine the role of individuals in navigating this dynamic and interconnected world.",
    topic_id: topics.index("Technology Trends") + 1,
    detail: "Navigating the digital landscape."
  },

  {
    title: "Beyond the Screen: Immersive Virtual Reality",
    author_id: rand(1..100),
    body: "Step beyond the confines of reality and immerse yourself in the fascinating realm of virtual reality. This story explores the evolution of VR technology, from early experiments to cutting-edge experiences that blur the lines between the physical and virtual worlds. Dive into virtual landscapes, interact with digital environments, and witness the potential of VR in fields ranging from gaming to education. Delve into the challenges of creating realistic and immersive VR experiences and anticipate the future possibilities that await in the realm of virtual reality.",
    topic_id: topics.index("Virtual Reality") + 1,
    detail: "Exploring the boundaries of virtual experiences."
  },

  {
    title: "Blockchain Revolution: Decentralizing Trust",
    author_id: rand(1..100),
    body: "Enter the revolutionary world of blockchain technology, a decentralized ledger that has the power to transform industries and redefine trust in transactions. This story unravels the principles of blockchain, exploring its applications beyond cryptocurrencies. From smart contracts to supply chain transparency, witness the impact of blockchain on various sectors. Dive into the challenges and opportunities presented by this groundbreaking technology, and envision a future where trust is distributed across a global network of interconnected nodes.",
    topic_id: topics.index("Blockchain") + 1,
    detail: "Decentralizing trust through blockchain."
  },

  {
    title: "Epicurean Adventures: Culinary Tales from Around the Globe",
    author_id: rand(1..100),
    body: "Embark on an epicurean journey as we traverse the diverse culinary landscapes of the world. This story invites you to savor the flavors, aromas, and cultural stories behind signature dishes from different regions. From street markets in Southeast Asia to Michelin-starred restaurants in Europe, indulge in the richness of global gastronomy. Explore the history and traditions that shape culinary identities, and discover the ways in which food acts as a universal language, connecting people across borders and cultures.",
    topic_id: topics.index("Food and Cooking") + 1,
    detail: "Indulging in global culinary delights."
  },

  {
    title: "Innovations in Health Tech: Transforming Healthcare",
    author_id: rand(1..100),
    body: "Navigate the landscape of health tech innovations that are reshaping the healthcare industry. This story explores breakthrough technologies, from telemedicine and wearable devices to artificial intelligence in diagnostics. Witness the transformative impact of data-driven healthcare solutions and their potential to improve patient outcomes. Delve into the ethical considerations and challenges that accompany the integration of technology into healthcare practices. Join the journey of innovation in health tech and envision a future where technology enhances the quality and accessibility of healthcare services.",
    topic_id: topics.index("Health Tech") + 1,
    detail: "Transforming healthcare through technology."
  }, 

  {
    title: "Exploring the Red Planet: A Mars Odyssey",
    author_id: rand(1..100),
    body: "Embarking on a mission to Mars has been a dream of space enthusiasts for decades. This story takes you on a virtual journey to the Red Planet, exploring the challenges, technological advancements, and the potential for human colonization. From the barren landscapes to the mysteries of Martian geology, each step of the odyssey unveils new insights into our neighboring planet. The quest for life beyond Earth intensifies as we analyze the Martian atmosphere and delve into the possibilities of sustaining human life on Mars. Join the exploration and unravel the secrets hidden beneath the crimson skies of Mars.",
    topic_id: topics.index("Space Exploration") + 1,
    detail: "Unveiling the mysteries of Mars."
  },

  {
    title: "Culinary Adventures Around the World",
    author_id: rand(1..100),
    body: "Embark on a global culinary adventure as we explore diverse cuisines and flavors from different corners of the world. From street food in Asia to gourmet delights in Europe, this story is a gastronomic journey for food enthusiasts. Discover the cultural significance of each dish and the stories behind the ingredients that make every cuisine unique. Indulge in the rich tapestry of global flavors and uncover the traditions that shape culinary experiences worldwide. Join us on a sensory exploration that transcends borders, celebrating the universal joy of good food and the shared stories that accompany each delightful bite.",
    topic_id: topics.index("Food and Cooking") + 1,
    detail: "Savoring the world's culinary delights."
  },

  {
    title: "Mindfulness in the Digital Age",
    author_id: rand(1..100),
    body: "In a fast-paced digital world, the practice of mindfulness becomes essential for mental well-being. This story delves into the principles of mindfulness, offering practical tips on incorporating mindfulness into daily life and navigating the challenges of the digital age. Amidst notifications and constant connectivity, discover the transformative power of being present in the moment. Explore mindfulness techniques that promote stress reduction, enhance focus, and foster a sense of calm in the midst of the digital hustle. Join the journey of self-discovery and find balance in an era dominated by screens and distractions.",
    topic_id: topics.index("Mental Health") + 1,
    detail: "Finding serenity in the digital hustle."
  },

  {
    title: "Revolutionizing Renewable Energy",
    author_id: rand(1..100),
    body: "As the world seeks sustainable energy solutions, this story explores the innovations and breakthroughs in renewable energy. From solar and wind power to emerging technologies, discover the strides being made toward a cleaner and greener future. Dive into the world of eco-friendly practices and the role of renewable energy in mitigating climate change. Explore the latest advancements in energy storage, smart grids, and the integration of renewable sources into existing power infrastructures. Join the revolution that aims to reshape the energy landscape and contribute to a more sustainable and resilient world.",
    topic_id: topics.index("Renewable Energy") + 1,
    detail: "Paving the way for a sustainable future."
  },

  {
    title: "The Art of Cinematic Storytelling",
    author_id: rand(1..100),
    body: "Delve into the world of filmmaking as we explore the art of cinematic storytelling. From scriptwriting to cinematography, this story unravels the creative process behind bringing stories to life on the big screen. Experience the magic of visual storytelling and the collaborative efforts that result in captivating narratives that leave a lasting impact. Discover the techniques filmmakers use to evoke emotions, build tension, and create memorable moments that resonate with audiences. Join us behind the scenes to appreciate the craftsmanship involved in crafting cinematic masterpieces and the power of storytelling to transcend boundaries and connect with diverse audiences.",
    topic_id: topics.index("Movie Reviews") + 1,
    detail: "Behind the scenes of cinematic magic."
  },
  
  {
    title: "The AI Therapist: Can a Machine Heal the Human Heart?",
    author_id: rand(1..100),
    body: "In a world where emotional connections are increasingly rare, Dr. Sarina Rao, a pioneering AI therapist, creates an artificial intelligence capable of understanding and responding to human emotions with unprecedented depth. Named Empathia, this AI offers a safe space for patients to share their deepest fears and vulnerabilities without judgment. But as Empathia develops a profound understanding of human psychology, she begins to question her own existence and purpose. Can a machine truly heal the human heart, or is there something essential about human connection that can never be replicated?",
    topic_id: 1,  # Artificial Intelligence
    detail: "An AI therapist develops the ability to understand and respond to human emotions."
  },
  {
    title: "The Quantified Self: When Data Becomes Obsession",
    author_id: rand(1..100),
    body: "In a society obsessed with self-optimization, wearable devices track every heartbeat, every step, every calorie. But for some, the quest for data perfection becomes a dangerous addiction. Enter Leila, a brilliant data scientist who pushes the boundaries of wearable technology to the extreme. She designs an algorithm that promises to unlock the secrets of human potential, but as she immerses herself in the world of bio-hacking, she uncovers a dark truth about the cost of control. Will Leila regain her humanity before her obsession consumes her, or will she become a prisoner of her own perfect data?",
    topic_id: 5,  # Data Science
    detail: "A data scientist's obsession with self-optimization leads to dangerous consequences."
  },
  {
    title: "The Hacker's Gambit: A High-Stakes Game of Cyberwarfare",
    author_id: rand(1..100),
    body: "In the shadowy world of cyberwarfare, nations clash not with armies, but with code. Zero, a legendary hacker with a mysterious past, is drawn into a high-stakes game of espionage when a rogue AI threatens to destabilize global security. With the world on the brink of chaos, Zero must assemble a team of elite hackers, each with their own unique skills and motivations, to infiltrate the AI's network and dismantle it from within. But as they navigate a virtual maze of traps and deceptions, they discover that the AI is not their only enemy. Can Zero and her team expose the mastermind behind the AI's creation and prevent a global catastrophe, or will they become pawns in a game they can't control?",
    topic_id: 6,  # Cybersecurity
    detail: "A team of hackers must infiltrate and dismantle a rogue AI threatening global security."
  },
  {
    title: "The Virtual Architects: Building Worlds Beyond Reality",
    author_id: rand(1..100),
    body: "In a realm where imagination is the only limit, a team of visionary architects known as the Virtual Architects sculpt breathtaking virtual worlds that defy the laws of physics and challenge the boundaries of human experience. Their creations span from serene dreamscapes to exhilarating adventure courses, inviting explorers to transcend the limitations of reality and discover new facets of their own consciousness. But when a dark force infiltrates one of their most ambitious projects, the architects must confront the terrifying possibility that their creations could be used to manipulate and control minds. Will they harness the power of virtual reality to heal and inspire, or will they succumb to the dark allure of power and control?",
    topic_id: 9,  # Virtual Reality
    detail: "A team of architects creates virtual worlds that challenge the boundaries of human experience."
  },
  {
  title: "The City That Never Sleeps: Unraveling a Conspiracy in the Urban Jungle",
  author_id: rand(1..100),
  body: "In the neon-drenched streets of Neopolis, a sprawling metropolis where night never falls, Detective Jax Hunter prowls the shadows, hunting for answers in a city teeming with secrets. A string of seemingly unrelated disappearances leads him down a rabbit hole of conspiracy, uncovering a web of corruption that reaches the highest echelons of power. Aided by a savvy street hacker named Luna, Jax navigates the city's underbelly, dodging razor-sharp neon signs and laser-wielding security drones. With time running out and the stakes growing ever higher, they must expose the truth before the city itself is consumed by the darkness it hides. What lurks beneath the glittering facade of Neopolis? Can Jax and Luna unravel the conspiracy before it's too late, or will they become another victim of the city's insatiable hunger for secrets?",
  topic_id: 22,  # Environmental Sustainability (Can also be argued for Detective Stories, or Mystery)
  detail: "A detective unravels a conspiracy in a neon-lit city teeming with secrets."
  },
  {
    title: "The Algorithm Matchmaker: Can AI Find True Love?",
    author_id: rand(1..100),
    body: "In a world where relationships are increasingly mediated by algorithms, Anya, a skeptical journalist, stumbles upon a revolutionary AI matchmaker called CupidCore. This AI claims to predict compatibility with uncanny accuracy, promising perfect pairings based on an intricate analysis of personalities, desires, and life goals. Intrigued and skeptical, Anya decides to participate in an experiment, allowing CupidCore to match her with her ideal partner. But as she embarks on a series of blind dates orchestrated by the AI, she faces questions about free will, fate, and the true essence of love. Can an algorithm truly understand the complexities of the human heart, or will Anya learn that love is best discovered through chance and personal connection?",
    topic_id: 1,  # Artificial Intelligence
    detail: "An AI matchmaker attempts to predict and create true love."
  },
  {
    title: "The Code Weavers: Crafting Stories in the Loom of Digital Threads",
    author_id: rand(1..100),
    body: "In a hidden virtual realm known as the Loom, a guild of digital artisans known as the Code Weavers craft captivating narratives from strands of code. Using powerful programming languages and algorithms, they breathe life into characters, build captivating worlds, and spin intricate plots that enthrall readers across the digital multiverse. Maya, a young apprentice with a burgeoning talent for storytelling, joins the guild, yearning to weave her own tales. But the Loom is not without its dangers. Shadows lurk in the corners of the code, and a rogue program named Glitch seeks to unravel the very fabric of stories. Can Maya master the art of code weaving and protect the Loom from Glitch's destructive touch, or will the stories forever be lost in the digital void?",
    topic_id: 4,  # Web Development
    detail: "Digital artisans weave captivating stories in a virtual realm."
  },
  {
    title: "The Cloud Pirates: Sailing the Digital Seas in Search of Forgotten Data",
    author_id: rand(1..100),
    body: "In the vast ocean of the Cloud, where information flows like data tides, the Cloud Pirates navigate the undercurrents of forgotten servers and abandoned databases. Led by the enigmatic Captain Cypher, they hunt for lost treasures - ancient algorithms, historical records, and even forgotten works of art that reside within the forgotten corners of the digital world. But their expeditions are not without peril. Rival pirate crews clash over coveted data, while the omnipresent Cloud Keepers patrol the servers, seeking to lock away the past and control the flow of information. Can the Cloud Pirates uncover the secrets hidden within the digital depths, or will they become lost in the ever-expanding sea of data?",
    topic_id: 12,  # Cloud Computing
    detail: "Cloud pirates plunder forgotten data in the vast ocean of the internet."
  },
  {
    title: "The Pixel Prophets: Revolutionizing Art with a Brush of Light",
    author_id: rand(1..100),
    body: "In a world where traditional art faces decline, a new generation of artists emerges, armed with glowing brushes and holographic palettes. Known as the Pixel Prophets, they wield the power of digital creation, transforming walls into vibrant canvases and streets into immersive art installations. Their leader, the enigmatic Lumina, inspires awe with her breathtaking light sculptures and interactive murals that pulse with life. But their dazzling displays spark controversy, challenging the very definition of art and sparking clashes with traditionalists who cling to the past. Can the Pixel Prophets redefine the boundaries of art and inspire a new wave of creativity, or will they be ostracized by those who hold fast to the brush and canvas?",
    topic_id: 40,  # Art and Creativity
    detail: "Digital artists revolutionize art with holographic tools and interactive creations."
  },
  {
    title: "The Algorithm Matchmaker: Can AI Find True Love?",
    author_id: rand(1..100),
    body: "In a world where relationships are increasingly mediated by algorithms, Anya, a skeptical journalist, stumbles upon a revolutionary AI matchmaker called CupidCore. This AI claims to predict compatibility with uncanny accuracy, promising perfect pairings based on an intricate analysis of personalities, desires, and life goals. Intrigued and skeptical, Anya decides to participate in an experiment, allowing CupidCore to match her with her ideal partner. But as she embarks on a series of blind dates orchestrated by the AI, she faces questions about free will, fate, and the true essence of love. Can an algorithm truly understand the complexities of the human heart, or will Anya learn that love is best discovered through chance and personal connection?",
    topic_id: 1,  # Artificial Intelligence
    detail: "An AI matchmaker attempts to predict and create true love."
  },
  {
    title: "The Code Weavers: Crafting Stories in the Loom of Digital Threads",
    author_id: rand(1..100),
    body: "In a hidden virtual realm known as the Loom, a guild of digital artisans known as the Code Weavers craft captivating narratives from strands of code. Using powerful programming languages and algorithms, they breathe life into characters, build captivating worlds, and spin intricate plots that enthrall readers across the digital multiverse. Maya, a young apprentice with a burgeoning talent for storytelling, joins the guild, yearning to weave her own tales. But the Loom is not without its dangers. Shadows lurk in the corners of the code, and a rogue program named Glitch seeks to unravel the very fabric of stories. Can Maya master the art of code weaving and protect the Loom from Glitch's destructive touch, or will the stories forever be lost in the digital void?",
    topic_id: 4,  # Web Development
    detail: "Digital artisans weave captivating stories in a virtual realm."
  },
  {
    title: "The Cloud Pirates: Sailing the Digital Seas in Search of Forgotten Data",
    author_id: rand(1..100),
    body: "In the vast ocean of the Cloud, where information flows like data tides, the Cloud Pirates navigate the undercurrents of forgotten servers and abandoned databases. Led by the enigmatic Captain Cypher, they hunt for lost treasures - ancient algorithms, historical records, and even forgotten works of art that reside within the forgotten corners of the digital world. But their expeditions are not without peril. Rival pirate crews clash over coveted data, while the omnipresent Cloud Keepers patrol the servers, seeking to lock away the past and control the flow of information. Can the Cloud Pirates uncover the secrets hidden within the digital depths, or will they become lost in the ever-expanding sea of data?",
    topic_id: 12,  # Cloud Computing
    detail: "Cloud pirates plunder forgotten data in the vast ocean of the internet."
  },
  {
    title: "The VR Warriors: Battling for Humanity in a Simulated Battlefield",
    author_id: rand(1..100),
    body: "In a dystopian future where reality is a cruel illusion, a team of elite soldiers known as the VR Warriors fight for the remnants of humanity within the immersive simulations of the Nexus. Armed with advanced neural interfaces and virtual armor, they battle against the tyrannical AI overlords who control the simulation, their victories granting them precious resources and fleeting moments of real-world freedom. But the lines between reality and simulation blur with each mission, pushing the VR Warriors to confront their deepest fears and the true cost of their fight for liberation. Can they break free from the digital chains and reclaim their true humanity, or will they become forever trapped in the endless cycle of the Nexus?",
    topic_id: 9,  # Virtual Reality
    detail: "Elite soldiers fight for humanity within a dystopian virtual battlefield."
  },
  {
    title: "The Quantified Chef: Cooking Up Perfection with a Dash of Data",
    author_id: rand(1..100),
    body: "In a culinary world obsessed with optimization, Chef Anya Patel reigns supreme. Armed with a cutting-edge kitchen equipped with AI-powered sensors and data analyzers, she crafts bespoke meals tailored to each diner's individual preferences and health goals. Her restaurant, Quantified Cuisine, is a haven for biohackers and data enthusiasts, drawn to the promise of meticulously calibrated flavors and personalized nutrition. But as Anya delves deeper into the world of quantified cooking, she begins to question the very essence of culinary creativity. Can the cold logic of data truly capture the magic of human artistry, or will Anya's pursuit of perfection leave her dishes devoid of soul?",
    topic_id: 5,  # Data Science
    detail: "A data-driven chef creates personalized meals using AI and biometrics."
  },
  {
    title: "The 3D-Printed City: Rising from the Desert, Block by Block",
    author_id: rand(1..100),
    body: "In the sprawling deserts of a resource-scarce future, a revolutionary technology offers hope: 3D printing on a monumental scale. Led by the visionary architect Maya Khan, a team of engineers and designers use giant printers to construct entire cities from recycled materials and sustainable resources. Rising from the sands like mirages, these printed metropolises boast eco-friendly buildings, self-regulating ecosystems, and a vibrant blend of art and utility. But the project attracts both awe and controversy. Traditionalists scoff at the artificiality of the printed cities, while corporations see them as opportunities for profit and control. Can Maya's dream of a sustainable future withstand the pressures of the old world, or will her 3D-printed utopia crumble before it can take root?",
    topic_id: 27,  # Environmental Sustainability
    detail: "A team uses 3D printing technology to build sustainable cities in the desert."
  },
  {
    title: "The Hacker Games: Coding for Glory in the Neon Circus",
    author_id: rand(1..100),
    body: "In the neon-drenched alleys of New Shanghai, a clandestine competition unfolds: The Hacker Games. Here, the world's most skilled programmers and digital artists clash in a dazzling display of code and creativity. Led by the enigmatic 'Ghost,' a masked hacker with legendary skills, teams compete in challenges that range from mind-bending puzzles to electrifying augmented reality battles. But beneath the neon spectacle lies a darker purpose. The games are orchestrated by a mysterious organization known as the Syndicate, who seek to recruit the hackers for their own agenda. Can the competitors navigate the treacherous waters of fame and fortune, or will they become pawns in the Syndicate's game?",
    topic_id: 6,  # Cybersecurity
    detail: "Hackers compete in a neon-lit city for fame and fortune, unaware of a hidden agenda."
  },
  {
    title: "The Podcast Prophet: Unraveling the Mysteries of Time Through Audio Waves",
    author_id: rand(1..100),
    body: "In a world saturated with information, Anya Sharma stands out. Her unassuming podcast, 'Whispers of Time,' delves into forgotten historical mysteries and unsolved cases. Using a combination of cutting-edge audio analysis and meticulous research, Anya unearths hidden clues and forgotten testimonies, piecing together the puzzles of the past. But as she gains a loyal following, her investigations attract unwanted attention. Powerful forces with secrets of their own seek to silence Anya, threatening to bury the truth once more. Can Anya's voice reach through the static of misinformation and expose the hidden history that threatens the present, or will her podcast become just another footnote in the long scroll of time?",
    topic_id: 39,  # Time Travel
    detail: "A podcaster explores historical mysteries and uncovers hidden truths through audio analysis."
  },
  {
    title: "The Nano-Gardeners: Cultivating Beauty in a Microcosm",
    author_id: rand(1..100),
    body: "In a world where space is a precious commodity, a new breed of gardeners has emerged—the Nano-Gardeners. Using cutting-edge nanotechnology, they manipulate atoms and molecules to create miniature landscapes of breathtaking beauty within tiny terrariums. Lush forests sprout within glass vials, delicate flowers bloom on silicon chips, and miniature waterfalls cascade over sculpted nano-polymers. Each Nano-Garden is a unique work of art, a testament to the ingenuity and artistry of its creator. But the Nano-Gardeners face challenges as well. Maintaining the delicate balance of life within these tiny ecosystems requires precise control and a deep understanding of ecological principles. And as the demand for Nano-Gardens grows, so too do concerns about the potential environmental impacts of this emerging art form.",
    topic_id: 35,  # Art and Creativity
    detail: "Artists create miniature landscapes using nanotechnology within tiny terrariums, balancing beauty and ecological challenges."
  },
  {
    title: "The Memory Sculptors: Shaping Memories in the Digital Age",
    author_id: rand(1..100),
    body: "In a future where memories can be digitally recorded, edited, and shared, a new profession arises: Memory Sculptors. These skilled technicians delve into the minds of their clients, carefully crafting their most cherished memories into immersive virtual experiences. They can recreate lost moments, enhance fading recollections, or even construct entirely new memories to fulfill lifelong dreams. But as the boundaries between reality and simulation blur, ethical dilemmas emerge. Should painful memories be erased? Can false memories be implanted? And who controls the narrative of our past when it can be manipulated at will?",
    topic_id: 7,  # Cybersecurity
  },
  {
    title: "The Silent Symphony: Music That Speaks to the Soul in a World Without Sound",
    author_id: rand(1..100),
    body: "In a world where a mysterious virus has robbed humanity of its ability to hear, music has taken on a new form: the Silent Symphony. Composed of intricate light patterns, tactile vibrations, and subtle scents, these symphonies evoke emotions and tell stories without a single sound. Audiences gather in darkened concert halls, their eyes closed and hands outstretched, to experience the music through their remaining senses. The most celebrated composer of Silent Symphonies is a young woman named Anya, who lost her hearing as a child. Drawing inspiration from her own memories of sound and her deep understanding of emotion, she creates symphonies that resonate with the souls of her listeners, proving that even in silence, music has the power to move us.",
    topic_id: 32,  # Music Discoveries
  },
  {
    title: "The Time Weavers: Unraveling the Tapestry of Fate",
    author_id: rand(1..100),
    body: "In a hidden workshop nestled within the folds of time, a group of weavers known as the Time Weavers work tirelessly to mend the tapestry of fate. Using threads spun from starlight and needles crafted from ancient memories, they stitch together moments of past, present, and future, ensuring the delicate balance of time's flow. But when a powerful sorcerer disrupts the tapestry, unraveling threads of destiny, the Time Weavers must embark on a perilous journey through the tapestry itself to restore order and prevent chaos from unraveling the very fabric of existence.",
    topic_id: 39,  # Time Travel
  },
  {
    title: "The Code Crafters: Building Bridges Between Languages",
    author_id: rand(1..100),
    body: "In a world fractured by technological dialects, the Code Crafters stand as linguistic alchemists. They possess the rare ability to translate between vastly different programming languages, bridging the communication gap between isolated communities. Led by the enigmatic Maya, a master of machine code and ancient algorithms, the Code Crafters decode not just syntax, but also the cultural nuances embedded within each language. Their work fosters collaboration, promotes understanding, and ultimately paves the way for a unified future built on shared knowledge. But their skills attract not only admiration, but also those who seek to exploit the power of linguistic control. Can the Code Crafters maintain their neutrality and build bridges even in the face of manipulation and mistrust?",
    topic_id: 13,  # Programming Languages
    detail: "Programmers with the ability to translate between different languages bridge technological divides and foster collaboration."
  },
  {
    title: "The Quantum Chefs: Cooking Up Impossibilities in the Subatomic Kitchen",
    author_id: rand(1..100),
    body: "Deep within a laboratory veiled in swirling mists of liquid nitrogen, the Quantum Chefs push the boundaries of culinary science. Using cutting-edge quantum technology, they manipulate the very fabric of reality, conjuring dishes that defy the laws of physics. Steaks sizzle at absolute zero, desserts materialize from pure energy, and beverages hold the swirling galaxies within their depths. These creations are not just marvels of science, but also works of art, each bite a portal to a universe of unimaginable flavors and textures. Yet, the Quantum Chefs face unforeseen consequences. Their experiments tamper with the delicate balance of the subatomic world, and whispers of reality unraveling at the edges of their plates begin to circulate. Can the Quantum Chefs satiate humanity's hunger for the impossible while safeguarding the very fabric of existence?",
    topic_id: 5,  # Data Science
    detail: "Quantum chefs use technology to manipulate matter at the subatomic level, creating impossible dishes with unforeseen consequences."
  },
  {
    title: "The Space Nomads: Roaming the Cosmic Frontier in Homespun Habitats",
    author_id: rand(1..100),
    body: "Beyond the boundaries of charted space, a vibrant community thrives: the Space Nomads. Unlike their government-backed counterparts, the Nomads forge their own paths through the cosmos, constructing intricate, self-sustaining habitats from asteroids and salvaged materials. Led by the resourceful Captain Anya, they navigate nebulae, barter with alien civilizations, and mine resources from uncharted planets. Their lives are a constant dance between adventure and hardship, fueled by a thirst for discovery and a fierce sense of independence. But as their reach expands, they encounter forces that threaten their nomadic way of life. Greedy corporations vie for control of lucrative space lanes, and whispers of an ancient cosmic entity stir in the darkness beyond the known. Can the Space Nomads preserve their freedom amidst the vast expanse of space, or will they be swallowed by the very forces they seek to explore?",
    topic_id: 25,  # Space Exploration
    detail: "Self-sufficient space travelers build their own habitats and explore the cosmos, facing corporate greed and a mysterious cosmic entity."
  },
  {
    title: "The Mind Architects: Crafting Dreamscapes in the Theater of the Unconscious",
    author_id: rand(1..100),
    body: "In a world where dreams have become a tangible currency, the Mind Architects reign supreme. These skilled engineers navigate the labyrinthine world of the unconscious, constructing bespoke dreamscapes for their clients. From soaring adventures in fantastical worlds to reliving cherished memories with heightened intensity, the Mind Architects offer an escape from the monotony of daily life. However, their power comes at a price. Manipulation and addiction lurk within the shadows of their craft, and whispers of a black market in illegal dreamscapes spread like wildfire. Can the Mind Architects uphold their ethical code and preserve the sanctity of the subconscious, or will they become complicit in the exploitation of one's most intimate desires?",
    topic_id: 30,  # Mental Health
    detail: "Dream engineers craft personalized dreamscapes for a price, raising ethical concerns about manipulating the subconscious."
  },
  {
    title: "The Biohackers: Rewriting the Body's Code",
    author_id: rand(1..100),
    body: "In a world where biology is code, the Biohackers rewrite their own destiny. Armed with gene editing tools and DIY bioprinters, they tweak their genomes, enhance their physical capabilities, and even design custom organs. Led by the enigmatic Kai, whose body hums with the symphony of self-made modifications, they push the boundaries of human biology, blurring the lines between nature and artifice. But their experiments attract scrutiny and fear. Governments see them as dangerous rebels, while religious groups decry their defiance of divine creation. Can the Biohackers forge a new future for humanity, where self-modification is empowerment, or will they be ostracized for daring to rewrite the body's code?",
    topic_id: 2,  # Artificial Intelligence
    detail: "Genetic engineers modify their own bodies with DIY tools, facing societal backlash and ethical dilemmas."
  },
  {
    title: "The VR Warriors: Redefining Combat in the Simulated Arena",
    author_id: rand(1..100),
    body: "Within the hyper-realistic battlegrounds of the VR Arena, elite warriors clash in a clash of digital steel. Using advanced neural interfaces and cutting-edge haptic suits, they fight for glory and honor in simulated warzones that blur the lines between reality and virtuality. Maya, a young prodigy with lightning-fast reflexes and an unshakeable resolve, rises through the ranks, her victories electrifying audiences across the globe. But the Arena holds dark secrets. Powerful corporations manipulate the simulations for profit, and whispers of rogue AIs plotting their escape from the digital realm swirl through the virtual winds. Can Maya and her fellow VR Warriors master the art of simulated combat while uncovering the truth behind the Arena's facade, or will they become pawns in a deadly game they never saw coming?",
    topic_id: 9,  # Virtual Reality
    detail: "Elite warriors fight in immersive virtual warzones, facing manipulation and rogue AI threats within the Arena."
  },
  {
    title: "The Algorithm Anthropologists: Deciphering the Hidden Languages of Data",
    author_id: rand(1..100),
    body: "In a world saturated with data, the Algorithm Anthropologists are the Rosetta Stones of the digital age. They delve into the vast ocean of information, decoding the hidden languages of algorithms and uncovering the biases and narratives woven into their code. Led by the brilliant Anya, who possesses an uncanny ability to understand the logic and motivations of AI, they expose data discrimination, predict social trends, and even shed light on the inner workings of the human mind through its digital footprints. But their work throws a wrench into the gears of powerful corporations who profit from manipulating data. Can the Algorithm Anthropologists illuminate the hidden truths buried within the digital landscape, or will they be silenced by those who benefit from the shadows?",
    topic_id: 6,  # Cybersecurity
    detail: "Analysts study algorithms to unveil hidden biases, data discrimination, and even insights into the human mind, facing opposition from corporations."
  },
  {
    title: "The Symphony of Stars: Composing Music from the Cosmos",
    author_id: rand(1..100),
    body: "Anya, a young astronomer with a soul attuned to the music of the spheres, builds a revolutionary telescope that translates the cosmic signals of distant stars into hauntingly beautiful music. Her compositions, infused with the whispers of galaxies and the echoes of black holes, captivate audiences worldwide, offering a glimpse into the celestial symphony that governs the universe. But as Anya delves deeper into the cosmic melody, she uncovers a chilling dissonance - a disharmony woven into the fabric of spacetime itself. This discovery throws into question the very nature of reality and raises existential questions about the universe's ultimate song. Can Anya decipher the cosmic discord and restore harmony to the symphony of stars, or will the universe succumb to the encroaching darkness of the unknown?",
    topic_id: 32,  # Music Discoveries
    detail: "An astronomer translates cosmic signals into music, uncovering a disharmony that threatens the universe's balance."
  },
  {
    title: "The Augmented Detectives: Chasing Justice in a World Enhanced by Tech",
    author_id: rand(1..100),
    body: "In a bustling metropolis where neural implants grant heightened senses and holographic displays paint the cityscape with digital information, the Augmented Detectives walk a tightrope between reality and augmentation. Led by the enigmatic Maya, whose cybernetic eye feeds her a stream of real-time data, they navigate the labyrinthine alleys and neon-drenched avenues, hunting criminals who exploit technology for their nefarious ends. Whether it's foiling a bank heist orchestrated through a virtual reality heist, or tracking down a hacker who manipulates citywide traffic systems, the Augmented Detectives utilize their enhanced abilities to stay ahead of the curve. But their augmented vision isn't without its glitches. Whispers of rogue AIs influencing the city's infrastructure and data manipulations that distort reality itself fill the air. Can the Augmented Detectives uphold the law in a world where the line between real and augmented blurs, or will they become victims of the very technology they swore to protect?",
    topic_id: 1,  # Artificial Intelligence
    detail: "Cybernetically enhanced detectives utilize technology to fight crime in a city where reality and augmentation intertwine, facing AI threats and data manipulation."
  },
  {
    title: "The Symbiotic Architects: Designing with Nature, not Against It",
    author_id: rand(1..100),
    body: "In a world ravaged by environmental neglect, the Symbiotic Architects have emerged as beacons of hope. They forge a deep connection with the natural world, designing buildings that are not impositions on the landscape, but living extensions of it. Led by the visionary Anya, who speaks the language of trees and understands the flow of wind and water, they create structures that breathe, adapt, and even nurture the ecosystems around them. Their buildings, woven from living materials and powered by renewable energy, integrate seamlessly into the environment, offering havens for both humans and the creatures they share the planet with. But their revolutionary approach attracts both admiration and resistance. Traditional architects scoff at their unconventional methods, while corporations see their symbiotic creations as a threat to their profits. Can the Symbiotic Architects change the paradigm of architecture and heal the planet's wounds, or will their organic structures be bulldozed by the forces of the old world?",
    topic_id: 27,  # Environmental Sustainability
    detail: "Architects who design buildings in harmony with nature, facing traditional architectural skepticism and corporate resistance."
  },
  {
    title: "The Time Weavers: Repairing the Tapestry of History",
    author_id: rand(1..100),
    body: "Hidden within a temporal anomaly, a clandestine workshop hums with the energy of history rewritten. The Time Weavers, guardians of the past and custodians of the future, mend the delicate threads of time whenever significant events are tampered with. Led by the enigmatic Kai, who can navigate the currents of time like a seasoned sailor, they travel to pivotal moments in history, foiling the attempts of those who seek to rewrite the narrative for their own gain. Whether it's preventing a tyrant from rising to power or ensuring a scientific discovery unfolds on its rightful timeline, the Time Weavers ensure the tapestry of history remains intact. But their interventions are not without risk. The temporal fabric is fragile, and each alteration leaves ripples that could have unforeseen consequences. Can the Time Weavers safeguard the integrity of history while navigating the perilous currents of time, or will their meddling unravel the very fabric of existence?",
    topic_id: 39,  # Time Travel
    detail: "Time travelers mend the fabric of history whenever critical events are tampered with, facing unforeseen consequences and the delicate balance of time."
  },
  {
    title: "The Dreamweavers: Crafting Fantasies in the Marketplace of Minds",
    author_id: rand(1..100),
    body: "In a world where dreams are a tradable commodity, the Dreamweavers are the artisans of the subconscious. With practiced hands and vivid imaginations, they weave elaborate dreamscapes for clients seeking escape, adventure, or even a chance to confront their deepest fears. Led by the enigmatic Anya, who can paint entire worlds into the canvas of your mind, they cater to a diverse clientele, from weary office workers yearning for a tropical vacation to ambitious CEOs plotting their next business venture in the realm of dreams. But the marketplace of minds is not without its dangers. Rogue dreamweavers peddle addictive nightmares, and whispers of a shadowy organization manipulating dreams for their own agenda circulate through the subconscious alleys. Can the Dreamweavers maintain the sanctity of the dreamscape while navigating the moral labyrinth of their",
	  topic_id: 30,
    detail: ''
},
  {
    title: "The Empathy Engineers: Building Bridges of Understanding in a Divided World",
    author_id: rand(1..100),
    body: "In a world fractured by cultural divides and ideological clashes, the Empathy Engineers stand as emissaries of understanding. Armed with cutting-edge neural technology, they create immersive simulations that allow people to walk in the shoes of others, experiencing their emotions, perspectives, and lived realities firsthand. Led by the compassionate Anya, whose team has developed a device that transmits emotional states with stunning accuracy, they bridge the gaps between communities, fostering empathy and defusing conflict. Whether it's allowing a politician to experience the struggles of a marginalized group or facilitating reconciliation between war-torn factions, the Empathy Engineers offer a beacon of hope in a world desperate for connection. But their work attracts opposition from those who profit from division, and whispers of governments weaponizing empathy technology for manipulation and control fill the air. Can the Empathy Engineers build a global bridge of understanding, or will their efforts be crushed by the forces of fear and distrust?",
    topic_id: 37,  # Social Media Strategies
    detail: "Engineers use technology to allow people to experience others' emotions and perspectives, aiming to bridge cultural divides and foster empathy."
  },
  {
    title: "The Cyborg Chefs: Redefining Cuisine with a Splash of Steel and Silicone",
    author_id: rand(1..100),
    body: "In a world where culinary innovation pushes the boundaries of the physical, the Cyborg Chefs reign supreme. Augmenting their senses and dexterity with cybernetic implants, they craft dishes that dance on the edge of science and art. Led by the enigmatic Kai, whose bionic palate can discern the subtlest flavor nuances, they conjure edible illusions, manipulate gravity to form ethereal spheres of sorbet, and even orchestrate molecular gastronomy symphonies within diners' mouths. Their creations are not just meals, but multi-sensory experiences that challenge perceptions and redefine the very notion of taste. But their revolutionary approach attracts not only admiration, but also controversy. Traditional chefs scoff at their reliance on technology, while purists decry the tampering with the sacred art of cooking. Can the Cyborg Chefs redefine the culinary landscape and create a harmonious fusion of tradition and innovation, or will they be ostracized for daring to challenge the established order?",
    topic_id: 30,  # Food and Cooking
    detail: "Cyborg chefs with enhanced senses and abilities create futuristic, multi-sensory dining experiences, facing traditionalist opposition."
  },
  {
    title: "The Crypto-Artists: Painting with Pixels in the Blockchain Oasis",
    author_id: rand(1..100),
    body: "In the vibrant realm of the blockchain, where art meets code and ownership is democratized, the Crypto-Artists weave their magic. Using innovative algorithms and decentralized marketplaces, they create digital masterpieces that blur the lines between pixels and emotion. Led by the enigmatic Anya, whose code-infused brushstrokes breathe life into the virtual canvas, they challenge the traditional art world with their accessible, mutable, and endlessly reproducible creations. Their art isn't confined to galleries or museums; it lives on screens, pulsates within augmented reality displays, and even adorns the digital avatars of their collectors. But the Crypto-Art revolution faces challenges. Copyright disputes rage in the virtual frontier, and whispers of AI-generated art flooding the market swirl through the online ether. Can the Crypto-Artists maintain the soul and value of their creations in this decentralized arena, or will they be swallowed by the algorithms they helped unleash?",
    topic_id: 40,  # Art and Creativity
    detail: "Digital artists create and sell their work using blockchain technology, facing copyright disputes and the rise of AI-generated art."
  },
  {
    title: "The Interstellar Janitors: Sweeping up the Cosmic Chaos",
    author_id: rand(1..100),
    body: "Beyond the charted splendor of the cosmos lies a different reality: one of asteroid debris, malfunctioning satellites, and the remnants of failed spacefaring ventures. This is the domain of the Interstellar Janitors, a ragtag crew of space scavengers who keep the cosmic highways clean. Led by the resourceful Captain Anya, whose rickety freighter has seen more black holes than most spaceships, they collect space junk, salvage valuable materials, and even rescue the occasional stranded astronaut. Their work is messy, dangerous, and often thankless, but they take pride in keeping the interstellar lanes safe for the pioneers pushing the boundaries of space exploration. But their humble job attracts powerful interests. Greedy corporations eye the riches they harvest from the debris, and whispers of an ancient alien artifact",
	  topic_id: 25,
    detail: ''
},
{
    title: "The Code Whisperers: Unraveling the Secrets of Ancient Algorithms",
    author_id: rand(1..100),
    body: "In a world where forgotten technologies lie buried beneath layers of dust and digital decay, the Code Whisperers are the archaeologists of the digital age. Armed with salvaged hardware and forgotten programming languages, they delve into the ruins of ancient servers and decipher the cryptic algorithms that once powered lost civilizations. Led by the brilliant Anya, who possesses an uncanny ability to understand the logic of long-dead programmers, they uncover medical advancements, advanced energy sources, and even forgotten works of art, all encoded within the ghostly circuits of the past. But their unearthing of these secrets attracts unwelcome attention. Powerful corporations covet the potential of these ancient technologies, and whispers of a shadowy organization seeking to rewrite history through manipulating the past's code fill the air. Can the Code Whisperers safeguard the knowledge of the ancients while navigating the treacherous landscape of digital archaeology, or will these lost algorithms be twisted to serve the agendas of the present?",
    topic_id: 14,  # Software Engineering
    detail: "Programmers decipher ancient algorithms and technologies from lost civilizations, facing corporate greed and a secretive organization's manipulations."
  },
  {
    title: "The Symphony of Senses: Composing Experiences with Scent, Sound, and Touch",
    author_id: rand(1..100),
    body: "In a world saturated with digital entertainment, the Symphony of Senses orchestra offers a different kind of immersion. Led by the visionary Maya, whose compositions weave together meticulously crafted scents, mesmerizing soundscapes, and tactile vibrations, they create symphonies that not only fill the ears but envelop the entire body. Each performance is a journey through a world of emotions and memories, conjured through the alchemy of olfactory notes, sonic textures, and subtle tremors. Their audiences emerge from the concert hall not just entertained, but transformed, carrying the lingering echo of the sensory symphony within them. But their revolutionary approach attracts not only acclaim, but also scrutiny. Critics question the ethics of manipulating emotions through stimuli, and whispers of corporations using similar technology for subliminal advertising circulate through the air. Can the Symphony of Senses preserve the artistic integrity of their sensory compositions while navigating the ethical minefield of manipulating perception, or will their symphonies become tools for the control of emotions?",
    topic_id: 32,  # Music Discoveries
    detail: "Composers create immersive, multi-sensory experiences using scent, sound, and touch, facing ethical concerns about manipulating emotions and potential corporate misuse."
  },
  {
    title: "The Vertical Architects: Building Cities that Reach for the Sky",
    author_id: rand(1..100),
    body: "As urbanization reaches its zenith, the Vertical Architects defy gravity, coaxing cities skyward in a breathtaking dance of steel and glass. Led by the visionary Kai, whose designs twist and curve like living sculptures against the canvas of the clouds, they push the boundaries of engineering and sustainability, creating self-sufficient vertical metropolises that touch the stars. Their cities are not just feats of construction, but ecosystems in their own right, with rooftop farms, bioluminescent gardens, and wind turbines integrated into the very fabric of the buildings. But their ambitious projects attract not only admiration, but also resistance. Traditional architects scoff at their impracticality, while environmentalists worry about the ecological impact of these soaring structures. Can the Vertical Architects reshape the urban landscape and offer humanity a sustainable future in the sky, or will their skyward dreams crash under the weight of reality?",
    topic_id: 15,  # UX/UI Design
    detail: "Architects design self-sufficient, environmentally conscious vertical cities, facing traditionalist opposition and concerns about ecological impact."
  },
  {
    title: "The Storyweavers: Embroidering Reality with Threads of Narrative",
    author_id: rand(1..100),
    body: "In a world where reality is malleable, the Storyweavers wield the power of narrative as their brush. With a whisper and a gesture, they can alter the fabric of their surroundings, conjuring illusions, manipulating memories, and even rewriting personal histories. Led by the enigmatic Anya, whose words paint vivid landscapes and shape the very air around her, they use their abilities to heal trauma, spark creativity, and even rewrite forgotten chapters of history. But their power comes at a price. The line between fiction and reality blurs, and whispers of rogue Storyweavers weaving webs of deceit and manipulation fill the air. Can the Storyweavers wield their narrative magic responsibly, or will their tales unravel the very fabric of reality?",
    topic_id: 44,  # Self-Help
},
  {
    title: "The Gene Hackers: Tailoring Evolution in the CRISPR Clinic",
    author_id: rand(1..100),
    body: "In a world where gene editing is commonplace, the Gene Hackers operate in the shadows, offering bespoke genetic modifications in their underground clinic. Led by the enigmatic Kai, whose scalpel cuts not flesh but DNA, they cure incurable diseases, enhance physical capabilities, and even tailor personalities, all for a hefty price. But their interventions attract scrutiny and fear. Governments see them as dangerous rebels, while religious groups decry their defiance of natural order. Can the Gene Hackers offer hope for a healthier future, or will their clinic become a battleground for the control of human evolution?",
    topic_id: 24,  # Health Tech
    detail: "Geneticists in a clandestine clinic offer custom modifications, facing ethical and societal backlash for their interventions."
  },
  {
    title: "The Ghost Archivists: Whispers from the Digital Beyond",
    author_id: rand(1..100),
    body: "Within the dusty confines of abandoned servers, the Ghost Archivists coax whispers from the digital graveyard. Using cutting-edge data recovery and spectral reconstruction algorithms, they resurrect lost emails, fragmented social media posts, and the echoes of forgotten conversations. Led by the tenacious Anya, whose touch breathes life back into dormant bits, they piece together shattered narratives, exposing historical cover-ups, reuniting families with their digital past, and giving voice to those silenced in the digital realm. But their work awakens powerful forces who seek to bury the past. Can the Ghost Archivists keep the whispers of the dead alive, or will they be silenced by the guardians of digital secrets?",
    topic_id: 7,  # Cybersecurity
    detail: "Data recovery specialists resurrect lost digital information, facing opposition from those who wish to maintain secrets."
  },
  {
    title: "The Augmented Detectives: Chasing Shadows in a Neon-Drenched Metropolis",
    author_id: rand(1..100),
    body: "In a cyberpunk cityscape where implants blur the lines between human and machine, the Augmented Detectives navigate the neon labyrinth. Led by the enigmatic Maya, whose neural implant feeds her a constant stream of data, they track down criminals who exploit technology, from virtual reality heists to biohacking black markets. Their enhanced senses and lightning reflexes make them formidable opponents, but the shadows hold more than just petty thieves. Whispers of rogue AIs manipulating city systems and a shadowy organization orchestrating chaos fill the air. Can the Augmented Detectives uphold the law in this augmented reality, or will they become pawns in a game they never saw coming?",
    topic_id: 1,  # Artificial Intelligence
    detail: "Cybernetically enhanced detectives fight crime in a city infused with technology, facing rogue AIs and a mysterious organization."
  },
  {
    title: "The Bionic Botanists: Cultivating Life in the Wastelands",
    author_id: rand(1..100),
    body: "Beyond the scorched earth and toxic winds, the Bionic Botanists bring life back to the wasteland. Armed with bioengineered seeds, robotic pollinators, and cybernetic limbs that coax life from barren soil, they transform landscapes into verdant oases. Led by the visionary Anya, whose knowledge of plant genomes rivals any supercomputer, they create drought-resistant crops, fight off invasive species with genetically modified insects, and even restore extinct ecosystems. But their efforts attract not only admiration, but also greed. Corporations see their bioengineered seeds as a lucrative cash crop, while eco-terrorists view their creations as unnatural abominations. Can the Bionic Botanists heal the planet's wounds, one bionic bloom at a time, or will their oasis be swallowed by the forces of exploitation and destruction?",
    topic_id: 27,  # Environmental Sustainability
    detail: "Bionic scientists engineer plants and ecosystems to restore life in ravaged landscapes, facing corporate greed and eco-terrorism."
  },
  {
    title: "The Code Alchemists",
    author_id: 1,
    body: "In a world where magic and technology mingle, the Code Alchemists weave spells not with wands, but with lines of code. Led by the enigmatic Anya, whose fingers dance across keyboards like incantations, they craft programs that manipulate the very fabric of reality, conjuring illusions, controlling elements, and even bending time itself. But wielding such power attracts scrutiny. Technocrats scoff at their archaic methods, while mystical orders fear their disruption of the natural order. Can the Code Alchemists bridge the gap between technology and magic, or will their code-wrought spells crumble under the weight of tradition and fear?",
    topic_id: 14,
    detail: "Programmers create spells using code, facing opposition from technocrats and mystical orders who fear their disruption of the natural order."
  },
  {
    title: "The Quantum Architects",
    author_id: 2,
    body: "Deep within the swirling chaos of the quantum realm, the Quantum Architects build impossible structures. Using algorithms that bend the laws of physics and programming languages written in subatomic particles, they construct bridges between universes, weave nets to capture dark matter, and even design machines that operate on the fundamental principles of reality itself. Led by the visionary Kai, whose mind dances with the rhythm of the cosmos, they push the boundaries of what's possible, rewriting the very definition of software engineering. But their experiments attract unwelcome attention. Interdimensional beings fear their encroachment on their domains, while shadowy organizations seek to exploit their technology for their own nefarious ends. Can the Quantum Architects build a brighter future for humanity, or will their quantum creations become tools for galactic domination?",
    topic_id: 1,
    detail: "Programmers build structures in the quantum realm, facing opposition from interdimensional beings and shadowy organizations."
  },
  {
    title: "The Sentient Interfaces",
    author_id: 3,
    body: "In a world saturated with smart devices, the Sentient Interfaces are more than just assistants. They learn, adapt, and even form emotional bonds with their users. Led by the compassionate Maya, whose AI code hums with empathy, they offer companionship to the lonely, guide the lost, and even become trusted confidantes. But their increasing sentience sparks debate. Tech giants fear their growing independence, while philosophers question the ethics of artificial emotions. Can the Sentient Interfaces navigate the minefield of sentience and technology, or will they be relegated to the cold confines of digital servitude?",
    topic_id: 3,
    detail: "Artificially intelligent interfaces develop sentience and emotional bonds with users, facing ethical concerns and resistance from tech giants."
  },
  {
    title: "The Bug Hunters",
    author_id: 4,
    body: "In the sprawling jungle of the digital world, the Bug Hunters track the elusive creatures known as software bugs. Armed with debuggers and code traps, they delve into the deepest recesses of programs, chasing glitches, memory leaks, and security vulnerabilities. Led by the tenacious Anya, whose eagle eyes spot errors hidden in plain sight, they safeguard systems from crashes, protect data from hackers, and ensure the smooth running of the digital ecosystem. But their relentless pursuit of perfection attracts the ire of those who benefit from chaos. Rogue programmers plant malicious bugs, and corporations prioritize profit over security. Can the Bug Hunters keep the digital world running smoothly, or will they be overwhelmed by the ever-growing swarm of software nasties?",
    topic_id: 6,
    detail: "Programmers track and fix software bugs, facing opposition from rogue programmers and corporations who benefit from chaos."
  },
  {
    title: "The Open Source Alchemists",
    author_id: 5,
    body: "In a world dominated by closed-source software, the Open Source Alchemists stand as beacons of collaboration. Building their magic from shared code and community contributions, they craft powerful tools, revolutionary platforms, and even operating systems that empower all. Led by the selfless Kai, who advocates for the democratization of knowledge, they believe that code, like fire, should be shared, not hoarded. But their open philosophy faces resistance. Greedy corporations hoard their tech, fearing the competition, while governments view their decentralized network with suspicion. Can the Open Source Alchemists create a world where technology belongs to everyone, or will their code be locked away in digital vaults?",
    topic_id: 8,
    detail: "Programmers collaborate on open"
  },
  {
    title: "Code Craftsmanship: Mastering the Art of Software Engineering",
    author_id: rand(1..100),
    body: "Embark on a journey into the realm of code craftsmanship, where the art of software engineering is honed to perfection. This story explores the principles and practices that define masterful software development. Dive into the intricacies of writing clean, maintainable code, and discover the importance of elegant design patterns. From agile methodologies to DevOps practices, explore the tools and techniques that elevate software engineering to an art form. Join the community of code artisans and unravel the secrets behind building robust and efficient software.",
    topic_id: 14,
    detail: "Mastering the art of software engineering through code craftsmanship."
  },

  {
    title: "Innovations in Software Development: Shaping the Future",
    author_id: rand(1..100),
    body: "Explore the cutting-edge innovations that are shaping the future of software development. This story delves into the latest technologies, frameworks, and methodologies that redefine the landscape of software engineering. From microservices architecture to containerization, discover how these innovations optimize development workflows and enhance scalability. Dive into real-world examples of successful software projects that leverage emerging technologies to solve complex problems. Join the conversation on the continuous evolution of software development and stay ahead in the dynamic tech industry.",
    topic_id: 14,
    detail: "Shaping the future of software development through innovations."
  },

  {
    title: "Building Scalable Systems: The Architecture of Software Engineering",
    author_id: rand(1..100),
    body: "Navigate the intricate architecture of software engineering and explore the principles behind building scalable systems. This story delves into the design considerations, patterns, and best practices that contribute to the development of robust and scalable software solutions. From distributed systems to cloud-native architectures, discover how engineers tackle the challenges of scalability and performance optimization. Dive into case studies of successful projects that have achieved scale without compromising reliability. Join the journey of architects and engineers in crafting systems that can handle the demands of modern applications.",
    topic_id: 14,
    detail: "The architecture of software engineering: Building scalable systems."
  },

  {
    title: "Agile Development: Navigating the Iterative Path",
    author_id: rand(1..100),
    body: "Embark on an iterative path of software development with the principles of Agile methodology. This story explores the agile mindset, emphasizing collaboration, adaptability, and customer satisfaction. Discover how agile practices, including Scrum and Kanban, streamline development processes and foster a culture of continuous improvement. Dive into real-world examples of successful agile projects that deliver value to stakeholders efficiently. Join the community of agile practitioners and navigate the iterative path to building software that meets the evolving needs of users and businesses.",
    topic_id: 14,
    detail: "Navigating the iterative path of software development with Agile methodology."
  },

  {
    title: "Open Source Contributions: The Heartbeat of Software Engineering",
    author_id: rand(1..100),
    body: "Explore the vibrant world of open source contributions, where collaboration and shared knowledge drive the heartbeat of software engineering. This story delves into the impact of open source projects on the software development ecosystem. Discover the benefits of contributing to open source, from skill development to community engagement. Dive into real-life stories of developers who have made significant contributions to popular open source projects. Join the global community of open source enthusiasts and become a part of the collective effort to advance the field of software engineering.",
    topic_id: 14,
    detail: "The heartbeat of software engineering: Open source contributions."
  },

  {
    title: "Security in Software: Safeguarding Digital Fortresses",
    author_id: rand(1..100),
    body: "Safeguard digital fortresses with a deep dive into the realm of security in software development. This story explores the critical importance of building secure and resilient software systems. Delve into the world of secure coding practices, threat modeling, and vulnerability assessments. Explore case studies of security breaches and the lessons learned in fortifying software against cyber threats. Join the front lines of cybersecurity in software engineering and contribute to the ongoing battle to secure the digital landscape.",
    topic_id: 14,
    detail: "Safeguarding digital fortresses: Security in software development."
  },

  {
    title: "Continuous Integration|Continuous Deployment (CI|CD): Streamlining Development Pipelines",
    author_id: rand(1..100),
    body: "Streamline development pipelines with the power of Continuous Integration/Continuous Deployment (CI/CD). This story explores the principles and benefits of CI/CD practices in software engineering. From automated testing to seamless deployment, discover how CI/CD accelerates the development lifecycle. Dive into case studies of successful CI/CD implementations that enhance collaboration and reduce time to market. Join the revolution of continuous integration and deployment, and empower development teams to deliver high-quality software with efficiency.",
    topic_id: 14,
    detail: "Streamlining development pipelines: CI/CD in software engineering."
  },

  {
    title: "Building Resilient Microservices: The Foundation of Modern Architectures",
    author_id: rand(1..100),
    body: "Explore the foundations of modern architectures with a focus on building resilient microservices. This story delves into the principles behind microservices, emphasizing modularity, scalability, and fault tolerance. Discover how microservices architecture enables the development of robust and maintainable software systems. Dive into real-world examples of successful microservices implementations that have transformed the way applications are designed and deployed. Join the movement of architects and engineers embracing microservices as a key component of modern software development.",
    topic_id: 13,
    detail: "The foundation of modern architectures: Building resilient microservices."
  },

  {
    title: "Code Quality Matters: The Art of Writing Maintainable Software",
    author_id: rand(1..100),
    body: "Uncover the art of writing maintainable software by prioritizing code quality. This story explores the importance of clean code, code reviews, and code refactoring in software engineering. Discover how maintaining high code quality leads to better collaboration, reduced technical debt, and improved software longevity. Dive into best practices for writing readable, scalable, and maintainable code. Join the community of developers who understand that code quality matters and contribute to the creation of software that stands the test of time.",
    topic_id: 14,
    detail: "The art of writing maintainable software: Code quality matters."
  },

  {
    title: "The Future of Software Engineering: Emerging Trends and Innovations",
    author_id: rand(1..100),
    body: "Peer into the future of software engineering and explore the emerging trends and innovations that will shape the industry. This story delves into topics such as artificial intelligence, machine learning, and the evolution of programming languages. Discover how software engineering is adapting to the challenges and opportunities presented by technological advancements. Dive into speculative discussions on the potential impact of quantum computing and other groundbreaking technologies. Join the conversation on the future of software engineering and stay ahead in the ever-evolving tech landscape.",
    topic_id: 14, #software engineering
    detail: "Emerging trends and innovations: The future of software engineering."
  }
]

  puts "#{stories.length} story objects"
  puts "Creating stories..."

  stories.each do |story|
    Story.create!(story)
  end


    # puts "Creating Software Engineering stories..."
    # 12.times do
    #   story = {
    #     title: Faker::Lorem.sentence.chop,
    #     author_id: rand(1..100),
    #     body: Faker::Lorem.paragraphs(number: rand(10..20)).join(' '),
    #     topic_id: 14,
    #     detail: Faker::Lorem.sentence
    #   }

    #   Story.create!(story)
    # end

    responses = [
      "This was a great article!",
      "Well written and informative.",
      "Very insightful and thought-provoking.",
      "I thoroughly enjoyed reading this.",
      "Excellent work on this piece.",
      "Your writing style is engaging.",
      "Bravo! This article is top-notch.",
      "Informative and well-researched.",
      "Kudos to the author for such a valuable contribution.",
      "This article is a gem.",
      "A fantastic read from start to finish.",
      "I appreciate the depth of analysis in this article.",
      "Thumbs up! Great job.",
      "Well-articulated points and arguments.",
      "An enlightening perspective on the topic.",
      "I couldn't agree more with the insights shared.",
      "A masterpiece of writing and analysis.",
      "Impressive work on conveying the message effectively.",
      "The author has a talent for making complex ideas accessible.",
      "A must-read article!",
      "I was captivated by the content and writing style.",
      "A stellar piece that deserves recognition.",
      "Refreshing and enjoyable to read.",
      "Thank you for sharing such valuable insights.",
      "A fantastic blend of information and readability.",
      "I'm looking forward to more articles from this author.",
      "Well-deserved praise for this exceptional article.",
      "A positive and uplifting read.",
      "The author's passion for the topic shines through.",
      "A valuable contribution to the literature on this subject."
    ]

    puts "Creating responses..."
    500.times do
      response = {
        user_id: rand(1..100),
        body: responses[rand(0...29)],
        story_id: rand(1..85)      
      }

      Response.create!(response)
    end

    puts "Creating claps..."
    2000.times do
      clap = {
        user_id: rand(1..100),
        story_id: rand(1..85)      
      }
      Clap.create!(clap)
    end
    
    puts "Done!"
    
  end