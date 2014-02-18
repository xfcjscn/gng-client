define(['infra-client/app/scripts/models/server'], function(server) {
    var gngServer = {};

    gngServer._actionHistory = null;
    gngServer.getActionHistory = function(){
        if(!gngServer._actionHistory){
            gngServer._actionHistory = server.getDb().then(function(dbContext) {
                var p = dbContext.ActionHistory.toArray();
                return p;
            });
        }
        return gngServer._actionHistory;
    };
    return gngServer;
});