import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers,Users} from "./data/user";
let _Users=Users;

export default {
  bootstrap(){
    let mock = new MockAdapter(axios);
    mock.onGet('/success').reply(200,{
      msg:'success'
    });
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });
    //登录
    mock.onPost('/login').reply(config => {
      let {name,pad} = JSON.parse(config.data);
      return new Promise((resolve => {
        let user=null;
        setTimeout(()=>{
          let hasUser=LoginUsers.some(u =>{
            if (u.username === name && u.password === pad){
              user = JSON.parse(JSON.stringify(u));
              user.userpad = undefined ;
              return true
            }
          });
          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }])
          }else {
            resolve([200, { code: 500, msg: '账号或密码错误'}])
          }
        },1000)
      }));
    });
    //getting
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUser = _Users.filter(user=>{
        if(name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise(resolve => {
        setTimeout(()=>{
          resolve([200, {
            users: mockUser
          }],1000);
        });
      });
    });
    //getting 分页
    mock.onGet('/user/listpage').reply(config => {
      let {page,name} = config.params;
      let mockUser = _Users.filter(user=>{
        if(name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUser.length;
      mockUser = mockUser.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise(resolve => {
        setTimeout(()=>{
          resolve([200, {
            total:total,
            users: mockUser
          }],1000);
        });
      });
    });
    //remove
    mock.onGet("/user/remove").reply(config => {
      let {id} = config.params;
      _Users = _Users.filter(u=> u.id !== id);
      setTimeout(()=>{
        resolve([200, {
          code: 200,
          msg: '删除成功'
        }]);
      },1000);
    });
    //Remove
    mock.onGet("/user/batchremove").reply(config => {
      let {ids} = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u=> !ids.includes(u.id));
      setTimeout(()=>{
        resolve([200, {
          code: 200,
          msg: '删除成功'
        }]);
      },1000);
    });
    //edit
    mock.onGet("/user/edit").reply(config => {
      let {id,name,age,birth} = config.params;
      _Users.some(u=>{
        if (u.id === id) {
          u.name = name;
          u.age = age;
          u.birth = birth;
          return true;
        };
      });
      return new Promise(resolve => {
        setTimeout(()=>{
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        },1000)
      });
    });
    //add
    mock.onGet("/user/add").reply(config => {
      let {id,name,age, birth } = config.params;
      _Users.push({
        id: id,
        name: name,
        age: age,
        birth: birth,
      });
      return new Promise(resolve => {
        setTimeout(()=>{
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        },1000);
      });
    });
  }
}
