import '../Styles/ChatSuggestions.css';


function Suggestion({ suggestion }) {
        return (
                <div className="suggestion">
                        <p className="image"></p>

                        <div className="detail">
                                <p className="name">
                                        { suggestion.username }
                                </p>

                                <p className="mutual-count">
                                        { suggestion.mutualFriends }
                                </p>
                        </div>
                </div>
        );
}

function ChatSuggestions() {
        const friends = [
                {
                  id: 1,
                  username: "skylineRider",
                  email: "skyline.rider@example.com",
                  bio: "Coffee-fueled designer. Loves night drives.",
                  notifications: true, // on/off for THIS user by the account holder
                  mutualFriends: 12,
                  totalFriends: 180,
                  groups: 8,
                  filesShared: {
                    photos: 14,
                    videos: 5,
                    audios: 2,
                    documents: 3,
                    links: 7,
                    voiceMessages: 9
                  },
                  chatHistory: [
                    {
                      message: "Yo, you coming to the meetup tonight?",
                      file: null,
                      date: "2025-01-12",
                      time: "18:42",
                      seen: true
                    },
                    {
                      message: "",
                      file: { type: "photo", url: "img_4920.jpg" },
                      date: "2025-01-11",
                      time: "21:10",
                      seen: true
                    }
                  ]
                },
                {
                  id: 2,
                  username: "technoFox",
                  email: "t.fox@example.com",
                  bio: "Frontend dev, dark mode advocate.",
                  notifications: false,
                  mutualFriends: 4,
                  totalFriends: 220,
                  groups: 10,
                  filesShared: {
                    photos: 3,
                    videos: 1,
                    audios: 0,
                    documents: 1,
                    links: 12,
                    voiceMessages: 4
                  },
                  chatHistory: [
                    {
                      message: "Check out this link, it’s wild",
                      file: null,
                      date: "2025-02-01",
                      time: "10:03",
                      seen: false
                    }
                  ]
                },
                {
                  id: 3,
                  username: "mellowMint",
                  email: "minty@example.com",
                  bio: "Chill beats and warm vibes.",
                  notifications: true,
                  mutualFriends: 9,
                  totalFriends: 150,
                  groups: 6,
                  filesShared: {
                    photos: 10,
                    videos: 3,
                    audios: 6,
                    documents: 0,
                    links: 5,
                    voiceMessages: 12
                  },
                  chatHistory: [
                    {
                      message: "Good morning! Hope you're thriving today",
                      file: null,
                      date: "2025-01-22",
                      time: "07:14",
                      seen: true
                    }
                  ]
                },
                {
                  id: 4,
                  username: "orbitNova",
                  email: "nova.orbit@example.com",
                  bio: "Space nerd + amateur photographer.",
                  notifications: false,
                  mutualFriends: 3,
                  totalFriends: 98,
                  groups: 2,
                  filesShared: {
                    photos: 22,
                    videos: 8,
                    audios: 1,
                    documents: 2,
                    links: 9,
                    voiceMessages: 3
                  },
                  chatHistory: [
                    {
                      message: "",
                      file: { type: "video", url: "mars_walkthrough.mp4" },
                      date: "2025-01-20",
                      time: "19:27",
                      seen: true
                    }
                  ]
                },
                {
                  id: 5,
                  username: "lushGarden",
                  email: "gardenlush@example.com",
                  bio: "Plants. Plants. And more plants.",
                  notifications: true,
                  mutualFriends: 6,
                  totalFriends: 76,
                  groups: 4,
                  filesShared: {
                    photos: 41,
                    videos: 12,
                    audios: 0,
                    documents: 4,
                    links: 10,
                    voiceMessages: 6
                  },
                  chatHistory: []
                },
                {
                  id: 6,
                  username: "byteWizard",
                  email: "byte.wizard@example.com",
                  bio: "Full-stack gremlin, breaker of builds.",
                  notifications: true,
                  mutualFriends: 19,
                  totalFriends: 310,
                  groups: 15,
                  filesShared: {
                    photos: 2,
                    videos: 0,
                    audios: 0,
                    documents: 8,
                    links: 20,
                    voiceMessages: 1
                  },
                  chatHistory: [
                    {
                      message: "Here’s that doc I promised.",
                      file: { type: "document", url: "project_notes.pdf" },
                      date: "2025-03-03",
                      time: "14:55",
                      seen: true
                    }
                  ]
                },
                {
                  id: 7,
                  username: "sunsetVibe",
                  email: "sunvibe@example.com",
                  bio: "Catching sunsets like it's a sport.",
                  notifications: false,
                  mutualFriends: 10,
                  totalFriends: 160,
                  groups: 7,
                  filesShared: {
                    photos: 16,
                    videos: 6,
                    audios: 2,
                    documents: 1,
                    links: 3,
                    voiceMessages: 7
                  },
                  chatHistory: [
                    {
                      message: "Dude, look at last night’s colors!",
                      file: { type: "photo", url: "sunset_004.png" },
                      date: "2025-01-10",
                      time: "18:03",
                      seen: true
                    }
                  ]
                },
                {
                  id: 8,
                  username: "crispLogic",
                  email: "logic.crisp@example.com",
                  bio: "Math lover. Logic puzzles hoarder.",
                  notifications: true,
                  mutualFriends: 2,
                  totalFriends: 70,
                  groups: 5,
                  filesShared: {
                    photos: 0,
                    videos: 0,
                    audios: 0,
                    documents: 11,
                    links: 4,
                    voiceMessages: 0
                  },
                  chatHistory: [
                    {
                      message: "Found this puzzle, thought you'd enjoy",
                      file: null,
                      date: "2025-03-09",
                      time: "16:22",
                      seen: false
                    }
                  ]
                },
                {
                  id: 9,
                  username: "berryPop",
                  email: "bpop@example.com",
                  bio: "Colorful chaos since 2001.",
                  notifications: true,
                  mutualFriends: 14,
                  totalFriends: 200,
                  groups: 12,
                  filesShared: {
                    photos: 30,
                    videos: 14,
                    audios: 5,
                    documents: 1,
                    links: 15,
                    voiceMessages: 8
                  },
                  chatHistory: [
                    {
                      message: "Happy birthday!! 🎉",
                      file: null,
                      date: "2024-12-14",
                      time: "09:11",
                      seen: true
                    }
                  ]
                },
                {
                  id: 10,
                  username: "quietRiver",
                  email: "riverquiet@example.com",
                  bio: "Introvert mode: always on.",
                  notifications: false,
                  mutualFriends: 1,
                  totalFriends: 43,
                  groups: 1,
                  filesShared: {
                    photos: 1,
                    videos: 0,
                    audios: 3,
                    documents: 0,
                    links: 0,
                    voiceMessages: 12
                  },
                  chatHistory: [
                    {
                      message: "Hey, thanks for checking in.",
                      file: null,
                      date: "2025-02-18",
                      time: "12:31",
                      seen: true
                    }
                  ]
                }
              ];
              
        return (
                <div className="chat-suggestions">
                        <div className="text">
                                <p className="title">
                                        Friend suggestions
                                </p>

                                <p className="more">
                                        more
                                </p>
                        </div>

                        <div className="suggestions">
                                { friends.map((friend, index) => (
                                        <Suggestion key={index} suggestion={friend} />
                                )) }
                        </div>
                </div>
        );
}

export default ChatSuggestions;