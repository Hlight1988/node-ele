/* eslint-disable quotes */
const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');



/* GET users listing. */
router.get("/", function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/register',(req,res) => {
	// console.log(req.body)

	User.findOne({email:req.body.email})
		.then((user) => {
			if(user){
				// 用户已存在，证明该邮箱已注册
				return res.status(400).json({email:'邮箱已被注册！'})
			}else{

				// gravatar全球公认头像
				const avatar = gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'})

				const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    identity:req.body.identity,
                    avatar,
                    password:req.body.password
				});

				// 给密码加密
                bcrypt.genSalt(10,function (err,salt) {
                	bcrypt.hash(newUser.password ,salt,function (err,hash) {
						if(err) throw err;

						newUser.password = hash;

						// 保存新注册的用户
						newUser.save()
							.then(user => {
								res.json(user)
							})
							.catch(err => console.log(err))
					})
				})
			}
		})
})
router.post('/login',(req,res,next) => {
	// console.log('login')
	const email = req.body.email;
	const password = req.body.password

	// 查询数据库
	User.findOne({email})
		.then(user => {
			if(!user){
				res.status(404).json({email:"用户不存在"})
			}

			// 密码匹配
			bcrypt.compare(password,user.password)
				.then(isMatch => {
					if(isMatch){
						// 登录成功
						// 定义一个规则
						const rule = {
						    id:user.id,
                            name:user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        }

						jwt.sign(rule,config.keys,{expiresIn: 3600},(err,token) => {
							if(err) throw err;
							res.json({
								success:true,
								token:'Bearer ' + token
							})

						})
						// res.json({msg:'success'})
					}else{
						return res.status(400).json({msg:'密码错误'})
					}
				})
		})
})

router.get('/current',passport.authenticate(
	"jwt",
	{ session: false }),
	(req,res) =>
	{
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            identity: req.user.identity
        });
	}

);

module.exports = router;
