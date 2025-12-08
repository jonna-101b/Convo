const friends = [
        {
                _id: "f1a92c91",
                username: "daniel_miller",
                email: "skyline.rider@example.com",
                bio: "Coffee-fueled designer. Loves night drives.",
                notifications: true,
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
                                _id: "c1a01",
                                owner: "friend",
                                message: "Yo, you coming to the meetup tonight?",
                                file: null,
                                date: "2025-01-12",
                                time: "18:42",
                                seen: true
                        },
                        {
                                _id: "c1a02",
                                owner: "friend",
                                message: "",
                                file: { type: "photo", url: "img_4920.jpg" },
                                date: "2025-01-11",
                                time: "21:10",
                                seen: true
                        },
                        {
                                _id: "c1a03",
                                owner: "you",
                                message: "Wait, where exactly is it again?",
                                file: null,
                                date: "2025-01-12",
                                time: "18:45",
                                seen: true
                        },
                        {
                                _id: "c1a04",
                                owner: "friend",
                                message: "Downtown lounge, same spot as last time.",
                                file: null,
                                date: "2025-01-12",
                                time: "18:46",
                                seen: true
                        },
                        {
                                _id: "c1a05",
                                owner: "you",
                                message: "Say less, I’ll be there. You driving?",
                                file: null,
                                date: "2025-01-12",
                                time: "18:48",
                                seen: true
                        },
                        {
                                _id: "c1a06",
                                owner: "friend",
                                message: "Yep. Want me to pick you up?",
                                file: null,
                                date: "2025-01-12",
                                time: "18:50",
                                seen: true
                        },
                        {
                                _id: "c1a07",
                                owner: "you",
                                message: "Nah I'm good, I'll walk. Need the steps anyway lol.",
                                file: null,
                                date: "2025-01-12",
                                time: "18:51",
                                seen: true
                        }
                ]
        },
        {
                _id: "f2b13d02",
                username: "aaron_fox",
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
                                _id: "c2b01",
                                owner: "friend",
                                message: "Check out this link, it’s wild",
                                file: null,
                                date: "2025-02-01",
                                time: "10:03",
                                seen: false
                        },
                        {
                                _id: "c2b02",
                                owner: "you",
                                message: "Bro I swear if it’s another cursed CSS trick…",
                                file: null,
                                date: "2025-02-01",
                                time: "10:10",
                                seen: false
                        },
                        {
                                _id: "c2b03",
                                owner: "friend",
                                message: "LMAOOO just open it 👀",
                                file: null,
                                date: "2025-02-01",
                                time: "10:11",
                                seen: false
                        },
                        {
                                _id: "c2b04",
                                owner: "you",
                                message: "Okay wait… that’s actually cool",
                                file: null,
                                date: "2025-02-01",
                                time: "10:15",
                                seen: false
                        },
                        {
                                _id: "c2b05",
                                owner: "friend",
                                message: "Told you! We gotta try this in our project.",
                                file: null,
                                date: "2025-02-01",
                                time: "10:16",
                                seen: false
                        },
                        {
                                _id: "c2b06",
                                owner: "you",
                                message: "Alright send me the repo later, I'll check it tonight.",
                                file: null,
                                date: "2025-02-01",
                                time: "10:17",
                                seen: false
                        }
                ]
        },
        {
                _id: "f3c78aa1",
                username: "mia_mint",
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
                                _id: "c3c01",
                                owner: "friend",
                                message: "Good morning! Hope you're thriving today",
                                file: null,
                                date: "2025-01-22",
                                time: "07:14",
                                seen: true
                        },
                        {
                                _id: "c3c02",
                                owner: "you",
                                message: "Morning! Trying my best lol. You up early?",
                                file: null,
                                date: "2025-01-22",
                                time: "07:20",
                                seen: true
                        },
                        {
                                _id: "c3c03",
                                owner: "friend",
                                message: "Yeah, couldn’t sleep. Ended up listening to lo-fi at like 5am 😅",
                                file: null,
                                date: "2025-01-22",
                                time: "07:22",
                                seen: true
                        },
                        {
                                _id: "c3c04",
                                owner: "you",
                                message: "Classic you 😂 got any new playlist recs?",
                                file: null,
                                date: "2025-01-22",
                                time: "07:25",
                                seen: true
                        },
                        {
                                _id: "c3c05",
                                owner: "friend",
                                message: "Sending one sec—this one’s super calming.",
                                file: null,
                                date: "2025-01-22",
                                time: "07:26",
                                seen: true
                        },
                        {
                                _id: "c3c06",
                                owner: "friend",
                                message: "",
                                file: { type: "link", url: "lofi_playlist_2025" },
                                date: "2025-01-22",
                                time: "07:27",
                                seen: true
                        },
                        {
                                _id: "c3c07",
                                owner: "you",
                                message: "Got it! I’ll play this while I work later.",
                                file: null,
                                date: "2025-01-22",
                                time: "07:30",
                                seen: true
                        }
                ]
        },
        {
                _id: "f4d55b90",
                username: "nova_hart",
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
                                _id: "c4d01",
                                owner: "friend",
                                message: "",
                                file: { type: "video", url: "mars_walkthrough.mp4" },
                                date: "2025-01-20",
                                time: "19:27",
                                seen: true
                        },
                        {
                                _id: "c4d02",
                                owner: "you",
                                message: "Bro… this looks insane 😭 the colors are unreal.",
                                file: null,
                                date: "2025-01-20",
                                time: "19:31",
                                seen: true
                        },
                        {
                                _id: "c4d03",
                                owner: "friend",
                                message: "Right?? I tried editing it to match that NASA tone.",
                                file: null,
                                date: "2025-01-20",
                                time: "19:33",
                                seen: true
                        },
                        {
                                _id: "c4d04",
                                owner: "you",
                                message: "You gotta teach me that color grading thing you do.",
                                file: null,
                                date: "2025-01-20",
                                time: "19:35",
                                seen: true
                        },
                        {
                                _id: "c4d05",
                                owner: "friend",
                                message: "Bet. This weekend? I’ll show you the preset.",
                                file: null,
                                date: "2025-01-20",
                                time: "19:36",
                                seen: true
                        },
                        {
                                _id: "c4d06",
                                owner: "you",
                                message: "Say less, I’ll pull up.",
                                file: null,
                                date: "2025-01-20",
                                time: "19:38",
                                seen: true
                        }
                ]
        },
        {
                _id: "f5e129aa",
                username: "lila_grow",
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
                chatHistory: [
                        {
                                _id: "c5h01",
                                owner: "friend",
                                message: "Just repotted my monstera and I swear it grew overnight 😂🌿",
                                file: null,
                                date: "2025-02-02",
                                time: "09:17",
                                seen: true
                        },
                        {
                                _id: "c5h02",
                                owner: "you",
                                message: "You and those plants are basically a family at this point 😭",
                                file: null,
                                date: "2025-02-02",
                                time: "09:20",
                                seen: true
                        },
                        {
                                _id: "c5h03",
                                owner: "friend",
                                message: "Lmao don’t expose me. But look—",
                                file: null,
                                date: "2025-02-02",
                                time: "09:21",
                                seen: true
                        },
                        {
                                _id: "c5h04",
                                owner: "friend",
                                message: "",
                                file: { type: "photo", url: "monstera_bigleaf.png" },
                                date: "2025-02-02",
                                time: "09:21",
                                seen: true
                        },
                        {
                                _id: "c5h05",
                                owner: "you",
                                message: "OH nah that’s huge, it looks like it can smack someone 💀",
                                file: null,
                                date: "2025-02-02",
                                time: "09:23",
                                seen: true
                        },
                        {
                                _id: "c5h06",
                                owner: "friend",
                                message: "If it hits someone it’s because it loves them. It’s a gentle giant.",
                                file: null,
                                date: "2025-02-02",
                                time: "09:24",
                                seen: true
                        },
                        {
                                _id: "c5h07",
                                owner: "you",
                                message: "💀💀 okay plant mom",
                                file: null,
                                date: "2025-02-02",
                                time: "09:26",
                                seen: true
                        }
                ]
        },                                
        {
                _id: "f6b44c10",
                username: "wiz_kairo",
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
                                _id: "c6w01",
                                owner: "friend",
                                message: "Here’s that doc I promised.",
                                file: { type: "document", url: "project_notes.pdf" },
                                date: "2025-03-03",
                                time: "14:55",
                                seen: true
                        },
                        {
                                _id: "c6w02",
                                owner: "you",
                                message: "Bet, I’ll check it in a sec.",
                                file: null,
                                date: "2025-03-03",
                                time: "15:01",
                                seen: true
                        },
                        {
                                _id: "c6w03",
                                owner: "friend",
                                message: "Also don’t judge the formatting… I was in ‘ship now, fix later’ mode.",
                                file: null,
                                date: "2025-03-03",
                                time: "15:03",
                                seen: true
                        },
                        {
                                _id: "c6w04",
                                owner: "you",
                                message: "Bro that’s your permanent mode 😭",
                                file: null,
                                date: "2025-03-03",
                                time: "15:05",
                                seen: true
                        },
                        {
                                _id: "c6w05",
                                owner: "friend",
                                message: "Hey. Efficient chaos > slow perfection.",
                                file: null,
                                date: "2025-03-03",
                                time: "15:06",
                                seen: true
                        },
                        {
                                _id: "c6w06",
                                owner: "you",
                                message: "Honestly… fair point.",
                                file: null,
                                date: "2025-03-03",
                                time: "15:08",
                                seen: true
                        },
                        {
                                _id: "c6w07",
                                owner: "friend",
                                message: "Wanna hop on a call later? I found a dumb bug and I need another brain.",
                                file: null,
                                date: "2025-03-03",
                                time: "15:10",
                                seen: true
                        }
                ]
        },      
        {
                _id: "f7d30cb2",
                username: "sola_haze",
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
                                _id: "c7s01",
                                owner: "friend",
                                message: "Dude, look at last night’s colors!",
                                file: { type: "photo", url: "sunset_004.png" },
                                date: "2025-01-10",
                                time: "18:03",
                                seen: true
                        },
                        {
                                _id: "c7s02",
                                owner: "you",
                                message: "Bro… that looks unreal, like someone painted the sky.",
                                file: null,
                                date: "2025-01-10",
                                time: "18:10",
                                seen: true
                        },
                        {
                                _id: "c7s03",
                                owner: "friend",
                                message: "Right?? I swear the sky was flexing on us.",
                                file: null,
                                date: "2025-01-10",
                                time: "18:12",
                                seen: true
                        },
                        {
                                _id: "c7s04",
                                owner: "you",
                                message: "Next time you BETTER call me before the sky starts bragging again.",
                                file: null,
                                date: "2025-01-10",
                                time: "18:15",
                                seen: true
                        },
                        {
                                _id: "c7s05",
                                owner: "friend",
                                message: "Okay okay chill 😭 I’ll text you if it looks fire tonight.",
                                file: null,
                                date: "2025-01-10",
                                time: "18:17",
                                seen: true
                        },
                        {
                                _id: "c7s06",
                                owner: "you",
                                message: "Better. I’m tryna see some god-tier clouds too.",
                                file: null,
                                date: "2025-01-10",
                                time: "18:19",
                                seen: true
                        }
                ]
        },
        {
                _id: "f8a2784f",
                username: "puzzle_kai",
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
                                _id: "c8k01",
                                owner: "friend",
                                message: "Found this puzzle, thought you'd enjoy",
                                file: null,
                                date: "2025-03-09",
                                time: "16:22",
                                seen: false
                        },
                        {
                                _id: "c8k02",
                                owner: "you",
                                message: "Hit me with it. You know I can’t resist a good brain torture.",
                                file: null,
                                date: "2025-03-09",
                                time: "16:25",
                                seen: false
                        },
                        {
                                _id: "c8k03",
                                owner: "friend",
                                message: "Say less 😂 here — it's a classic knight-and-knave logic grid.",
                                file: { type: "document", url: "knight_knave_puzzle.pdf" },
                                date: "2025-03-09",
                                time: "16:27",
                                seen: false
                        },
                        {
                                _id: "c8k04",
                                owner: "you",
                                message: "Oh no… those things cooked my brain in high school 💀",
                                file: null,
                                date: "2025-03-09",
                                time: "16:29",
                                seen: false
                        },
                        {
                                _id: "c8k05",
                                owner: "friend",
                                message: "Perfect. You’ll love this one then.",
                                file: null,
                                date: "2025-03-09",
                                time: "16:31",
                                seen: false
                        }
                ]
        },       
        {
                _id: "user009bp01",
                username: "BerryPop", 
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
                                _id: "bp_c001",
                                owner: "friend",
                                message: "Happy birthday!! 🎉",
                                file: null,
                                date: "2024-12-14",
                                time: "09:11",
                                seen: true
                        },
                        {
                                _id: "bp_c002",
                                owner: "you",
                                message: "Aww thank you! I totally forgot it was today lol.",
                                file: null,
                                date: "2024-12-14",
                                time: "09:13",
                                seen: true
                        },
                        {
                                _id: "bp_c003",
                                owner: "friend",
                                message: "HOW do you forget your own birthday 😭",
                                file: null,
                                date: "2024-12-14",
                                time: "09:14",
                                seen: true
                        },
                        {
                                _id: "bp_c004",
                                owner: "you",
                                message: "Skill issue probably 😌",
                                file: null,
                                date: "2024-12-14",
                                time: "09:15",
                                seen: true
                        },
                        {
                                _id: "bp_c005",
                                owner: "friend",
                                message: "I’m sending you a voice note later, prepare your ears.",
                                file: { type: "audio", url: "birthday_voicenote.mp3" },
                                date: "2024-12-14",
                                time: "09:18",
                                seen: false
                        }
                ]
        },        
        {
                _id: "user010qr01",
                username: "QuietRiver",
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
                                _id: "qr_c001",
                                owner: "friend",
                                message: "Hey, thanks for checking in.",
                                file: null,
                                date: "2025-02-18",
                                time: "12:31",
                                seen: true
                        },
                        {
                                _id: "qr_c002",
                                owner: "you",
                                message: "Of course! Haven’t heard from you in a while.",
                                file: null,
                                date: "2025-02-18",
                                time: "12:33",
                                seen: true
                        },
                        {
                                _id: "qr_c003",
                                owner: "friend",
                                message: "Yeah… life’s been loud lately. I needed the quiet.",
                                file: null,
                                date: "2025-02-18",
                                time: "12:35",
                                seen: true
                        },
                        {
                                _id: "qr_c004",
                                owner: "you",
                                message: "Totally get it. No pressure to talk — just letting you know I’m around.",
                                file: null,
                                date: "2025-02-18",
                                time: "12:37",
                                seen: true
                        },
                        {
                                _id: "qr_c005",
                                owner: "friend",
                                message: "Thanks. That actually means a lot.",
                                file: null,
                                date: "2025-02-18",
                                time: "12:40",
                                seen: false
                        }
                ]
        },                                                  
];

export default friends;