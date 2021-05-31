// Needed
const navigationConfig = [
    {
        'id': 'applications',
        'type': 'group',
        'children': [
            {
                'id': 'connect-component',
                'title': 'Connect',
                'type': 'item',
                'icon': 'add_circle',
                'url': '/Connect/Dashboard'
            },
            {
                'id': 'publish-component',
                'title': 'Publish',
                'type': 'item',
                'icon': 'publish',
                'url': '/Publish'
            },
            {
                'id': 'planner-component',
                'title': 'Planner',
                'type': 'item',
                'icon': 'calendar_view_day',
                'url': '/Planner'
            },
            {
                'id': 'content-studio',
                'title': 'Content Studio',
                'type': 'item',
                'icon': 'live_tv',
                'url': '/ContentStudio'
            },
            {
                'id': 'live-component',
                'title': 'Live Streaming',
                'type': 'item',
                'icon': 'live_tv',
                'url': '/Live'
            },
            {
                'id': 'teams-component',
                'title': 'Teams',
                'type': 'collapse',
                'icon': 'group',
                // 'url': '/Teams/Chat',
                'children': [
                    {
                        'id': 'teams-details',
                        'title': 'Manage Teams',
                        'type': 'item',
                        'icon': 'group',
                        'url': '/Teams/Details'
                    },
                    {
                        'id': 'chat-teams',
                        'title': 'Chat',
                        'type': 'item',
                        'icon': 'chat',
                        'url': '/Teams/Chat'
                    },
                    {
                        'id': 'teams-call-component',
                        'title': 'Call',
                        'type': 'item',
                        'icon': 'call',
                        'url': '/Teams/Call'
                    },
                    // {
                    //     'id': 'teams-kanban-component',
                    //     'title': 'Kanban',
                    //     'type': 'item',
                    //     'icon': 'board',
                    //     'url': '/Teams/Kanban'
                    // }
                ]
            },


            {
                'id': 'marketing-component',
                'title': 'Marketing',
                'type': 'item',
                'icon': 'assignment',
                'url': '/Marketing'
            },
            {
                'id': 'email-component',
                'title': 'Email',
                'type': 'item',
                'icon': 'email',
                'url': '/Mail/INBOX'
            },
            // {
            //     'id': 'profile-component',
            //     'title': 'Profile',
            //     'type': 'item',
            //     'icon': 'person_pin_circle',
            //     'url': '/Content-Posting/Publish'
            // },
            {
                'id': 'settings-component',
                'title': 'Settings',
                'icon': 'settings',
                'type': 'item',
                'url': '/Settings',
            },
        ]
    }
];

export default navigationConfig;
