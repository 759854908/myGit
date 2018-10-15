import Mock from 'mockjs'

const LoginUsers = [
  {
    id: 1,
    username: 'x759854908',
    password: '000000',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '徐某某'
  }
];
const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    }));
}

export { LoginUsers, Users };
