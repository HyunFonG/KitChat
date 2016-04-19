var dbConfig = require('./db.js');
var seeder = require('mongoose-seed');
var bCrypt = require('bcrypt-nodejs');
seeder.connect(dbConfig.url,function(){

	seeder.loadModels([
		'./model/ChatMessage.js',
		'./model/Group.js',
		'./model/User.js',
		'./model/UserJoinedGroup.js'
	]);

	seeder.clearModels(['ChatMessage','Group','User','UserJoinedGroup'],function(){
		seeder.populateModels([
			{
				'model':'ChatMessage',
				'documents':[
					{
						'username':'aa',
						'group':'OK',
						'message': 'เอากับกูมั้ย',
						'create_at': new Date("1994-11-29")
					},
					{
						'username':'bb',
						'group':'OK',
						'message': 'เอา',
						'create_at': new Date("1994-11-30")
					}
				]
			},
			{
				'model':'Group',
				'documents':[
					{
						'name':'OK'
					},
					{
						'name':'OK2'
					}
				]
			},
			{
				'model':'User',
				'documents':[
					{
						'username':'aa',
						'password':bCrypt.hashSync('aa', bCrypt.genSaltSync(10), null)
					}
				]
			},
			{
				'model':'UserJoinedGroup',
				'documents':[
					{
						'username':'aa',
						'group':'OK',
						'joined_at': new Date('1994-11-28')
					}
				]
			}
		]);
	});
});
