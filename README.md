# Small

Small is a Medium clone. Medium is recognized for hosting high quality, insightful publications covering a wide range of interesting topics. Users can read, save, create, and interact with publications. In the week of development, Small implements the following Medium features

### Features

**1. Hosting - [See Small Live!](https://small-2kuv.onrender.com/)**

**2. New account creation, Login**

**3. Stories**
    - Members can publish stories associated with a pre-existing Topic 

**4. Responses**
    - Stories can be responded to

**5. Claps**
    - Users can "applaud" Stories and Story Responses with Claps


### Technologies Used
- Rails
- PosgreSQL
- React
- Redux
- JBuilder
- BCrypt


```
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
        
        self.session_token ||= generate_unique_session_token
    end


    private

    def generate_unique_session_token
        
        loop do
            token = SecureRandom::urlsafe_base64
            return token if !User.exists?(session_token: token)
        end
    end
```


Features of a great production readme:
Brief explanation of what the app is and does
Link to live site
Discussion of technologies used
Delve deep into ~2 features that show off your technical abilities. Discuss both the challenges faced and your brilliant solutions.
Code snippets to highlight your best code (markdown code snippets, NOT screenshots)




