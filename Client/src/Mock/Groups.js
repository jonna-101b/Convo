const groups = [
        {
                _id: "g1a92c91",
                groupName: "Night Riders Club",
                inviteLink: "https://invite.example.com/nightriders",
                bio: "Late-night hangouts and spontaneous drives.",
                notifications: true,
                members: 42,
                filesShared: {
                        photos: 20,
                        videos: 6,
                        audios: 3,
                        documents: 4,
                        links: 10,
                        voiceMessages: 7
                },
                chatHistory: [
                        {
                                _id: "gc1a01",
                                owner: "member",
                                message: "Meetup at the usual spot tonight?",
                                file: null,
                                date: "2025-01-12",
                                time: "18:42",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc1a02",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "nrc_spot.jpg" },
                                date: "2025-01-12",
                                time: "18:45",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc1a03",
                                owner: "you",
                                message: "What’s the headcount looking like?",
                                file: null,
                                date: "2025-01-12",
                                time: "18:48",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc1a04",
                                owner: "member",
                                message: "Around 10 so far. More might join later.",
                                file: null,
                                date: "2025-01-12",
                                time: "18:50",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc1a05",
                                owner: "member",
                                message: "Also, someone bring a speaker. Last one died.",
                                file: null,
                                date: "2025-01-12",
                                time: "18:51",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc1a06",
                                owner: "you",
                                message: "I got one. Battery full too.",
                                file: null,
                                date: "2025-01-12",
                                time: "18:52",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc1a07",
                                owner: "member",
                                message: "W bet. Playlist ready?",
                                file: null,
                                date: "2025-01-12",
                                time: "18:54",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc1a08",
                                owner: "you",
                                message: "You already know. Mix of old-school + some new heat.",
                                file: null,
                                date: "2025-01-12",
                                time: "18:55",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc1a09",
                                owner: "member",
                                message: "",
                                file: { type: "voice", url: "vmsg_4832.wav" },
                                date: "2025-01-12",
                                time: "18:56",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc1a10",
                                owner: "member",
                                message: "Someone check traffic on the main road btw.",
                                file: null,
                                date: "2025-01-12",
                                time: "18:58",
                                seen: true,
                                pin: false
                        }
                ]
        },
        {
                _id: "g2b83d12",
                groupName: "Cozy Gamers Hub",
                inviteLink: "https://invite.example.com/cozygamers",
                bio: "Chill vibes, warm drinks, and long gaming nights.",
                notifications: false,
                members: 18,
                filesShared: {
                        photos: 5,
                        videos: 3,
                        audios: 1,
                        documents: 2,
                        links: 6,
                        voiceMessages: 4
                },
                chatHistory: [
                        {
                                _id: "gc2a01",
                                owner: "member",
                                message: "Anyone hopping on tonight?",
                                file: null,
                                date: "2025-02-02",
                                time: "19:20",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc2a02",
                                owner: "member",
                                message: "I just made hot chocolate so yeah, count me in.",
                                file: null,
                                date: "2025-02-02",
                                time: "19:22",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc2a03",
                                owner: "you",
                                message: "Give me 5 mins, updating my game.",
                                file: null,
                                date: "2025-02-02",
                                time: "19:23",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc2a04",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "cozy_setup_01.jpg" },
                                date: "2025-02-02",
                                time: "19:24",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc2a05",
                                owner: "member",
                                message: "Bro out here flexing the RGB sugar cubes 😭",
                                file: null,
                                date: "2025-02-02",
                                time: "19:25",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc2a06",
                                owner: "you",
                                message: "No way those are real right??",
                                file: null,
                                date: "2025-02-02",
                                time: "19:26",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc2a07",
                                owner: "member",
                                message: "",
                                file: { type: "video", url: "rgb_sugar_demo.mp4" },
                                date: "2025-02-02",
                                time: "19:27",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc2a08",
                                owner: "member",
                                message: "Okay but what are we playing? Valorant? Stardew? Don’t make me choose.",
                                file: null,
                                date: "2025-02-02",
                                time: "19:29",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc2a09",
                                owner: "you",
                                message: "Let’s do a warm-up on Stardew then jump to Valorant later.",
                                file: null,
                                date: "2025-02-02",
                                time: "19:30",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc2a10",
                                owner: "member",
                                message: "",
                                file: { type: "voice", url: "vmsg_20250202_01.wav" },
                                date: "2025-02-02",
                                time: "19:31",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc2a11",
                                owner: "member",
                                message: "Someone PLEASE water my crops when we load in. I forgot for like 5 days straight.",
                                file: null,
                                date: "2025-02-02",
                                time: "19:33",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc2a12",
                                owner: "you",
                                message: "Nah bro your crops are already ghosts 💀",
                                file: null,
                                date: "2025-02-02",
                                time: "19:34",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc2a13",
                                owner: "member",
                                message: "Lobby’s open btw, password is ‘cozy123’",
                                file: null,
                                date: "2025-02-02",
                                time: "19:36",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc2a14",
                                owner: "member",
                                message: "",
                                file: { type: "document", url: "patch_notes.pdf" },
                                date: "2025-02-02",
                                time: "19:38",
                                seen: true,
                                pin: false
                        }
                ]
        }, 
        {
                _id: "g3c12f44",
                groupName: "Urban Photographers",
                inviteLink: "https://invite.example.com/urbanphoto",
                bio: "Capturing stories through street photography.",
                notifications: true,
                members: 73,
                filesShared: {
                        photos: 40,
                        videos: 11,
                        audios: 0,
                        documents: 2,
                        links: 9,
                        voiceMessages: 3
                },
                chatHistory: [
                        {
                                _id: "gc3a01",
                                owner: "member",
                                message: "Found a new alleyway with insane lighting. Dropping pics in a sec.",
                                file: null,
                                date: "2025-01-30",
                                time: "14:10",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a02",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "alley_light_01.jpg" },
                                date: "2025-01-30",
                                time: "14:11",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a03",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "alley_light_02.jpg" },
                                date: "2025-01-30",
                                time: "14:12",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a04",
                                owner: "you",
                                message: "Oh that second one is crazy good. What lens were you using?",
                                file: null,
                                date: "2025-01-30",
                                time: "14:13",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a05",
                                owner: "member",
                                message: "50mm f/1.2 — honestly my favorite for portraits & moody shots.",
                                file: null,
                                date: "2025-01-30",
                                time: "14:14",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a06",
                                owner: "member",
                                message: "Anyone down for a photo walk this Saturday?",
                                file: null,
                                date: "2025-01-30",
                                time: "14:16",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a07",
                                owner: "you",
                                message: "I’m in. Morning or afternoon?",
                                file: null,
                                date: "2025-01-30",
                                time: "14:17",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a08",
                                owner: "member",
                                message: "Afternoon. Lighting’s better and it won’t be freezing lol.",
                                file: null,
                                date: "2025-01-30",
                                time: "14:18",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a09",
                                owner: "member",
                                message: "",
                                file: { type: "link", url: "https://location.example.com/map" },
                                date: "2025-01-30",
                                time: "14:20",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc3a10",
                                owner: "member",
                                message: "This is the meetup location. Easy parking too.",
                                file: null,
                                date: "2025-01-30",
                                time: "14:20",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc3a11",
                                owner: "member",
                                message: "",
                                file: { type: "video", url: "bts_shoot_clip.mp4" },
                                date: "2025-01-30",
                                time: "14:23",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a12",
                                owner: "you",
                                message: "This BTS clip is gold 😭 who was holding that reflector??",
                                file: null,
                                date: "2025-01-30",
                                time: "14:24",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a13",
                                owner: "member",
                                message: "Me. I was fighting the wind the whole time.",
                                file: null,
                                date: "2025-01-30",
                                time: "14:25",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a14",
                                owner: "member",
                                message: "Someone make that a meme please.",
                                file: null,
                                date: "2025-01-30",
                                time: "14:26",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc3a15",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "reflector_fail_meme.png" },
                                date: "2025-01-30",
                                time: "14:27",
                                seen: true,
                                pin: false
                        }
                ]
        }, 
        {
                _id: "g4d55e77",
                groupName: "Study Buddies",
                inviteLink: "https://invite.example.com/studyb",
                bio: "Daily accountability for students & self-learners.",
                notifications: true,
                members: 31,
                filesShared: {
                        photos: 1,
                        videos: 0,
                        audios: 2,
                        documents: 12,
                        links: 15,
                        voiceMessages: 5
                },
                chatHistory: [
                        {
                                _id: "gc4a01",
                                owner: "member",
                                message: "Alright everyone, drop your goals for today.",
                                file: null,
                                date: "2025-01-27",
                                time: "08:55",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc4a02",
                                owner: "you",
                                message: "Finish my chapter summary + review flashcards.",
                                file: null,
                                date: "2025-01-27",
                                time: "08:57",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a03",
                                owner: "member",
                                message: "Uploading my notes from yesterday in case anyone needs them!",
                                file: null,
                                date: "2025-01-27",
                                time: "08:59",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a04",
                                owner: "member",
                                message: "",
                                file: { type: "document", url: "econ_notes_2601.pdf" },
                                date: "2025-01-27",
                                time: "09:00",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a05",
                                owner: "member",
                                message: "Bless your soul for these notes fr.",
                                file: null,
                                date: "2025-01-27",
                                time: "09:01",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a06",
                                owner: "member",
                                message: "",
                                file: { type: "voice", url: "morning_checkin.wav" },
                                date: "2025-01-27",
                                time: "09:03",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a07",
                                owner: "you",
                                message: "Alright, timer on — starting first focus session.",
                                file: null,
                                date: "2025-01-27",
                                time: "09:04",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a08",
                                owner: "member",
                                message: "Let’s goooo 25-minute grind, no distractions!",
                                file: null,
                                date: "2025-01-27",
                                time: "09:05",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a09",
                                owner: "member",
                                message: "",
                                file: { type: "link", url: "https://pomodoro.example.com" },
                                date: "2025-01-27",
                                time: "09:06",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a10",
                                owner: "member",
                                message: "Break time! How’s everyone doing?",
                                file: null,
                                date: "2025-01-27",
                                time: "09:31",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a11",
                                owner: "you",
                                message: "Two pages done and my brain is sizzling a little bit.",
                                file: null,
                                date: "2025-01-27",
                                time: "09:33",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a12",
                                owner: "member",
                                message: "Same 😭 this chapter is unhinged.",
                                file: null,
                                date: "2025-01-27",
                                time: "09:34",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a13",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "messy_desk_monday.jpg" },
                                date: "2025-01-27",
                                time: "09:35",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a14",
                                owner: "member",
                                message: "My desk looks like a war zone… send help.",
                                file: null,
                                date: "2025-01-27",
                                time: "09:36",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a15",
                                owner: "member",
                                message: "Second focus round starting in 2 minutes!",
                                file: null,
                                date: "2025-01-27",
                                time: "09:38",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc4a16",
                                owner: "you",
                                message: "Let’s finish strong for the morning.",
                                file: null,
                                date: "2025-01-27",
                                time: "09:39",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc4a17",
                                owner: "member",
                                message: "",
                                file: { type: "voice", url: "focus_round_start.wav" },
                                date: "2025-01-27",
                                time: "09:40",
                                seen: true,
                                pin: false
                        }
                ]
        },                
        {
                _id: "g5e99f10",
                groupName: "Minimalist Home Crew",
                inviteLink: "https://invite.example.com/minicrew",
                bio: "Declutter, simplify, breathe.",
                notifications: false,
                members: 54,
                filesShared: {
                        photos: 16,
                        videos: 2,
                        audios: 1,
                        documents: 4,
                        links: 13,
                        voiceMessages: 2
                },
                chatHistory: [
                        {
                                _id: "gc5a01",
                                owner: "member",
                                message: "Alright crew — weekend declutter challenge starts NOW.",
                                file: null,
                                date: "2025-02-03",
                                time: "09:00",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc5a02",
                                owner: "member",
                                message: "Post your ‘before’ pics so we can shame you later 😭",
                                file: null,
                                date: "2025-02-03",
                                time: "09:01",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a03",
                                owner: "you",
                                message: "",
                                file: { type: "photo", url: "messy_closet_001.jpg" },
                                date: "2025-02-03",
                                time: "09:03",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a04",
                                owner: "member",
                                message: "OH. Oh wow. Yeah we got work to do LMAO",
                                file: null,
                                date: "2025-02-03",
                                time: "09:04",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a05",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "before_desk_chaos.jpg" },
                                date: "2025-02-03",
                                time: "09:05",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a06",
                                owner: "member",
                                message: "My desk looks like a hardware store exploded.",
                                file: null,
                                date: "2025-02-03",
                                time: "09:06",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a07",
                                owner: "member",
                                message: "",
                                file: { type: "voice", url: "morning_motivation.wav" },
                                date: "2025-02-03",
                                time: "09:07",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a08",
                                owner: "you",
                                message: "Starting with clothes. If I disappear, I drowned in hoodies.",
                                file: null,
                                date: "2025-02-03",
                                time: "09:08",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a09",
                                owner: "member",
                                message: "RULE #1: If you haven’t worn it in a year, it goes. No exceptions 😈",
                                file: null,
                                date: "2025-02-03",
                                time: "09:09",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a10",
                                owner: "member",
                                message: "",
                                file: { type: "link", url: "https://minimalism.example.com/guide" },
                                date: "2025-02-03",
                                time: "09:10",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a11",
                                owner: "member",
                                message: "This guide legit saved me when I downsized last year.",
                                file: null,
                                date: "2025-02-03",
                                time: "09:11",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a12",
                                owner: "you",
                                message: "Update: I found my old college ID. Why was I keeping this 😭",
                                file: null,
                                date: "2025-02-03",
                                time: "09:13",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a13",
                                owner: "member",
                                message: "Burn it lol",
                                file: null,
                                date: "2025-02-03",
                                time: "09:13",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a14",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "after_corner_cleaned.jpg" },
                                date: "2025-02-03",
                                time: "09:15",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc5a15",
                                owner: "member",
                                message: "One corner DONE. Let’s goooo.",
                                file: null,
                                date: "2025-02-03",
                                time: "09:16",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a16",
                                owner: "you",
                                message: "",
                                file: { type: "photo", url: "closet_progress_001.jpg" },
                                date: "2025-02-03",
                                time: "09:18",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc5a17",
                                owner: "member",
                                message: "Progress!! Keep going!",
                                file: null,
                                date: "2025-02-03",
                                time: "09:19",
                                seen: true,
                                pin: false
                        }
                ]
        },        
        {
                _id: "g6f01a21",
                groupName: "Hiking Adventurers",
                inviteLink: "https://invite.example.com/hikeadv",
                bio: "Trails, mountains, and good company.",
                notifications: true,
                members: 88,
                filesShared: {
                        photos: 25,
                        videos: 9,
                        audios: 0,
                        documents: 1,
                        links: 8,
                        voiceMessages: 6
                },
                chatHistory: [
                        {
                                _id: "gc6a01",
                                owner: "member",
                                message: "Sunday hike confirmed! Weather looks perfect.",
                                file: null,
                                date: "2025-02-05",
                                time: "14:32",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc6a02",
                                owner: "member",
                                message: "Which trail are we doing again?",
                                file: null,
                                date: "2025-02-05",
                                time: "14:33",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a03",
                                owner: "member",
                                message: "",
                                file: { type: "link", url: "https://trails.example.com/sunridge" },
                                date: "2025-02-05",
                                time: "14:34",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc6a04",
                                owner: "you",
                                message: "Sunridge trail is gorgeous but the incline is gonna pack us 😭",
                                file: null,
                                date: "2025-02-05",
                                time: "14:35",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a05",
                                owner: "member",
                                message: "Good thing we’re all built different 💪",
                                file: null,
                                date: "2025-02-05",
                                time: "14:36",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a06",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "last_week_hike_view.jpg" },
                                date: "2025-02-05",
                                time: "14:37",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a07",
                                owner: "you",
                                message: "That’s actually stunning. Can’t wait.",
                                file: null,
                                date: "2025-02-05",
                                time: "14:38",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a08",
                                owner: "member",
                                message: "What time are we meeting?",
                                file: null,
                                date: "2025-02-05",
                                time: "14:40",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a09",
                                owner: "member",
                                message: "7:30 AM at the parking lot. Don’t be late like last time 👀",
                                file: null,
                                date: "2025-02-05",
                                time: "14:41",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a10",
                                owner: "you",
                                message: "Bro that ONE time wasn’t my fault 😭 my alarm betrayed me.",
                                file: null,
                                date: "2025-02-05",
                                time: "14:42",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a11",
                                owner: "member",
                                message: "Sureeeee it didn’t.",
                                file: null,
                                date: "2025-02-05",
                                time: "14:43",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a12",
                                owner: "member",
                                message: "",
                                file: { type: "voice", url: "hike_rollcall.wav" },
                                date: "2025-02-05",
                                time: "14:45",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a13",
                                owner: "member",
                                message: "Roll call: drop a 🥾 if you're coming.",
                                file: null,
                                date: "2025-02-05",
                                time: "14:46",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a14",
                                owner: "you",
                                message: "🥾",
                                file: null,
                                date: "2025-02-05",
                                time: "14:47",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a15",
                                owner: "member",
                                message: "🥾🥾🥾 let’s goooo",
                                file: null,
                                date: "2025-02-05",
                                time: "14:48",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc6a16",
                                owner: "member",
                                message: "",
                                file: { type: "video", url: "trail_preview.mp4" },
                                date: "2025-02-05",
                                time: "14:49",
                                seen: true,
                                pin: false
                        }
                ]
        },        
        {
                _id: "g7ab92f3",
                groupName: "Midnight Bakers",
                inviteLink: "https://invite.example.com/midnightbakers",
                bio: "We bake when we should be asleep.",
                notifications: true,
                members: 31,
                filesShared: {
                        photos: 42,
                        videos: 7,
                        audios: 3,
                        documents: 1,
                        links: 6,
                        voiceMessages: 4
                },
                chatHistory: [
                        {
                                _id: "gc7a01",
                                owner: "member",
                                message: "Emergency question: how many eggs is too many eggs??",
                                file: null,
                                date: "2025-02-08",
                                time: "00:14",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a02",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "egg_disaster.jpg" },
                                date: "2025-02-08",
                                time: "00:15",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a03",
                                owner: "you",
                                message: "Bro what are you making 💀",
                                file: null,
                                date: "2025-02-08",
                                time: "00:16",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a04",
                                owner: "member",
                                message: "He said ‘vibes’ and just started cracking eggs 😭",
                                file: null,
                                date: "2025-02-08",
                                time: "00:17",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a05",
                                owner: "member",
                                message: "",
                                file: { type: "voice", url: "laughing_chaos.wav" },
                                date: "2025-02-08",
                                time: "00:18",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a06",
                                owner: "member",
                                message: "Okay but real talk — who has a good brownie recipe? Mine came out like cement last time.",
                                file: null,
                                date: "2025-02-08",
                                time: "00:20",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a07",
                                owner: "you",
                                message: "",
                                file: { type: "photo", url: "my_brownies_soft.jpg" },
                                date: "2025-02-08",
                                time: "00:21",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a08",
                                owner: "member",
                                message: "LOOK at those edges... teach me your ways 🙏",
                                file: null,
                                date: "2025-02-08",
                                time: "00:22",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a09",
                                owner: "member",
                                message: "",
                                file: { type: "link", url: "https://baking.example.com/perfect-brownies" },
                                date: "2025-02-08",
                                time: "00:23",
                                seen: true,
                                pin: true
                        },
                        {
                                _id: "gc7a10",
                                owner: "member",
                                message: "This recipe is elite btw. Follow the steps EXACTLY.",
                                file: null,
                                date: "2025-02-08",
                                time: "00:24",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a11",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "fluffy_bread_attempt.jpg" },
                                date: "2025-02-08",
                                time: "00:26",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a12",
                                owner: "you",
                                message: "HELLO?? That bread looks like a cloud I wanna sleep on it 😭",
                                file: null,
                                date: "2025-02-08",
                                time: "00:27",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a13",
                                owner: "member",
                                message: "It’s soft fr. I’m scared to cut it.",
                                file: null,
                                date: "2025-02-08",
                                time: "00:28",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a14",
                                owner: "member",
                                message: "",
                                file: { type: "video", url: "dough_kneading_asmr.mp4" },
                                date: "2025-02-08",
                                time: "00:30",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a15",
                                owner: "member",
                                message: "Midnight baking is honestly therapeutic.",
                                file: null,
                                date: "2025-02-08",
                                time: "00:31",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a16",
                                owner: "you",
                                message: "Until you remember you gotta wash every bowl you own 💀",
                                file: null,
                                date: "2025-02-08",
                                time: "00:32",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a17",
                                owner: "member",
                                message: "",
                                file: { type: "photo", url: "kitchen_disaster_aftermath.jpg" },
                                date: "2025-02-08",
                                time: "00:34",
                                seen: true,
                                pin: false
                        },
                        {
                                _id: "gc7a18",
                                owner: "member",
                                message: "This is my sign to go to bed actually.",
                                file: null,
                                date: "2025-02-08",
                                time: "00:35",
                                seen: true,
                                pin: false
                        }
                ]
        },                                                       
];


export default groups;