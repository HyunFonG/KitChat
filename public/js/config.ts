class Config{
    static get Default(): any{
        return {
            getUserURL: '/api/user',
            getGroupURL: '/api/group',
            createGroupURL: '/api/group/create',
            joinGroupURL: '/api/group/join',
            leaveGroupURL: '/api/group/leave',
            getGroupMessageURL: '/api/group/message'
        }
    }
}
