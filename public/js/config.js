var Config = (function () {
    function Config() {
    }
    Object.defineProperty(Config, "Default", {
        get: function () {
            return {
                getUserURL: '/api/user',
                getGroupURL: '/api/group',
                createGroupURL: '/api/group/create',
                joinGroupURL: '/api/group/join',
                leaveGroupURL: '/api/group/leave',
                getGroupMessageURL: '/api/group/message'
            };
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}());