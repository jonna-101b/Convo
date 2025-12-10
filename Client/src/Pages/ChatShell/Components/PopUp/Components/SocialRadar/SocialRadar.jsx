import './SocialRadar.css';


function Entity({ picture, name, extraInfo, action }) {
        return (
                <div className="entity">
                        <p className="picture">
                                <img src="www.dsyfsdhjlfashj.com" />
                        </p>

                        <div className="details">
                                <div className="info">
                                        <p className="name">
                                                { name }
                                        </p>

                                        <p className="extra-info">
                                                { extraInfo }
                                        </p>
                                </div>

                                <p className="action">
                                        { action }
                                </p>
                        </div>
                </div>
        );
}

const friendRequests = [
        {
                _id: "f1a92c91",
                username: "daniel_miller",
                email: "skyline.rider@example.com",
                bio: "Coffee-fueled designer. Loves night drives.",
                mutualFriends: 12,
                totalFriends: 180,
                groups: 8
        },
        {
                _id: "b7d34e52",
                username: "sofia_park",
                email: "sofia.spark@example.com",
                bio: "Bookworm. Amateur baker. Professional overthinker.",
                mutualFriends: 5,
                totalFriends: 92,
                groups: 4
        },
        {
                _id: "c4f29a18",
                username: "liam_everett",
                email: "liam.codes@example.com",
                bio: "Software dev who breaks things to fix them better.",
                mutualFriends: 9,
                totalFriends: 210,
                groups: 12
        },
        {
                _id: "a2e83d74",
                username: "maya_klein",
                email: "maya.waves@example.com",
                bio: "Surfer by sunrise, illustrator by sunset.",
                mutualFriends: 3,
                totalFriends: 67,
                groups: 5
        },
        {
                _id: "e9b17f60",
                username: "hunter_reed",
                email: "hunter.tracks@example.com",
                bio: "Trail runner. Podcast addict. Nature > everything.",
                mutualFriends: 14,
                totalFriends: 154,
                groups: 9
        }
];      

const friendSuggestions = [
        {
                _id: "s7c81a02",
                username: "elena_rojas",
                email: "elena.vibes@example.com",
                bio: "Traveler with too many maps and not enough plans.",
                mutualFriends: 2,
                totalFriends: 120,
                groups: 6
        },
        {
                _id: "d5f43b91",
                username: "marcus_gray",
                email: "m.grayshots@example.com",
                bio: "Weekend photographer. Full-time snack enthusiast.",
                mutualFriends: 7,
                totalFriends: 198,
                groups: 10
        },
        {
                _id: "p3a17e55",
                username: "talia_woods",
                email: "talia.w@example.com",
                bio: "Writer chasing messy ideas and late-night inspiration.",
                mutualFriends: 4,
                totalFriends: 85,
                groups: 5
        },
        {
                _id: "k8b92f14",
                username: "jason_quinn",
                email: "jq.devflow@example.com",
                bio: "Tech tinkerer. Building stuff nobody asked for.",
                mutualFriends: 6,
                totalFriends: 230,
                groups: 11
        },
        {
                _id: "m4d60e33",
                username: "amelia_sage",
                email: "amelia.sagey@example.com",
                bio: "Tea collector. Cat whisperer. Slow mornings advocate.",
                mutualFriends: 1,
                totalFriends: 56,
                groups: 3
        },
        {
                _id: "v9e21c88",
                username: "noah_bright",
                email: "noah.brightside@example.com",
                bio: "Optimist by nature. Runner by poor life choices.",
                mutualFriends: 8,
                totalFriends: 172,
                groups: 9
        }
];   

const gropuSuggestions = [
        {
                _id: "g1e82c01",
                name: "Night Owl Coders",
                description: "A community for people who build things when everyone else is asleep.",
                members: 842,
                mutualMembers: 5,
                category: "Technology",
                activityLevel: "high",
                createdAt: "2021-03-14"
        },
        {
                _id: "g4b75d19",
                name: "Weekend Hikers Club",
                description: "Casual treks, scenic photos, and finding the best trails near you.",
                members: 1290,
                mutualMembers: 3,
                category: "Outdoors",
                activityLevel: "medium",
                createdAt: "2020-11-02"
        },
        {
                _id: "g7c29e88",
                name: "Indie Music Haven",
                description: "For people who love discovering underground bands and hidden playlists.",
                members: 540,
                mutualMembers: 7,
                category: "Music",
                activityLevel: "high",
                createdAt: "2022-07-28"
        },
        {
                _id: "g2f50a34",
                name: "Digital Artists Collective",
                description: "A space for illustrators, 3D artists, and animators to share and grow.",
                members: 980,
                mutualMembers: 2,
                category: "Art",
                activityLevel: "medium",
                createdAt: "2019-05-19"
        },
        {
                _id: "g9a12f70",
                name: "Global Food Explorers",
                description: "Share recipes, restaurant finds, and all things delicious.",
                members: 1620,
                mutualMembers: 4,
                category: "Food",
                activityLevel: "high",
                createdAt: "2018-10-03"
        },
        {
                _id: "g5d07c90",
                name: "Mindful Mornings",
                description: "Meditation, journaling, and helping each other find calm starts.",
                members: 410,
                mutualMembers: 1,
                category: "Wellness",
                activityLevel: "low",
                createdAt: "2023-01-15"
        }
];      

function SocialRadar() {
        return (
                <div className="social-radar" onClick={(event) => {event.stopPropagation()}} >
                        <p className="title">
                                Social Radar
                        </p>

                        <div className="friend-requests radar-action">
                                <p className="label">
                                        Friend request
                                </p>

                                { friendRequests.map((friend) =>(
                                        <Entity 
                                                key={friend._id}
                                                name={friend.username} 
                                                extraInfo={`${friend.username} wants to message you`} 
                                                action={"accept"}
                                        />
                                )) }
                        </div>

                        <div className="friend-suggestions radar-action">
                                <p className="label">
                                        Friend suggestions
                                </p>

                                { friendSuggestions.map((friend) =>(
                                        <Entity 
                                                key={friend._id}
                                                name={friend.username} 
                                                extraInfo={` you have ${friend.mutualFriends} mutual friends`} 
                                                action={"follow"}
                                        />
                                )) }
                        </div>

                        <div className="group-suggestions radar-action">
                                <p className="label">
                                        Group suggestions
                                </p>

                                { gropuSuggestions.map((group) =>(
                                        <Entity 
                                                key={group._id}
                                                name={group.name} 
                                                extraInfo={`${group.members} members`} 
                                                action={"join"}
                                        />
                                )) }
                        </div>
                </div>
        );
}

export default SocialRadar;