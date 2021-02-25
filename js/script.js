/* global $*/

class User {
    name;
    age;
    gender;
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    drink(){
        if(this.age >= 20){
            return 'お酒をお楽しみください';
        }else{
            return 'お酒は20歳から。あと' + (20 - this.age) + '年お待ちください';
        }
    }
}

let now_all_users;

const init_data = () => {
    let init_users = Array();
    init_users.push(new User('高丘', 20, 'female'));
    init_users.push(new User('島', 48, 'male'));
    init_users.push(new User('山田', 16, 'female'));
    init_users.push(new User('青木', 30, 'male'));
    return init_users;
}

const create_table_title = () => {
    let tr = $('<tr>');
    tr.append($('<th>', {text: '連番'}));
    tr.append($('<th>', {text: '名前'}));
    tr.append($('<th>', {text: '年齢'}));
    tr.append($('<th>', {text: '性別'}));
    tr.append($('<th>', {text: 'お酒'}));
    $('#disp').append(tr);
}

const disp_all_users = (users) => {
    $('tr:not(:first)').remove();
    $.each(users, (index, user) => {
       let tr = $('<tr>');
       tr.append($('<td>', {text: index + 1}));
       tr.append($('<td>', {text: user.name}));
       tr.append($('<td>', {text: user.age + '歳'}));
       tr.append($('<td>', {text: user.gender === 'male' ? '男性' : '女性'}));
       tr.append($('<td>', {text: user.drink()}));
       $('#disp').append(tr);
    });
}

const add_user = () => {
    $('h1 + p').remove();
    const name = $('input[name="name"]').val();
    $('input[name="name"]').val("");
    const age = $('input[name="age"]').val();
    $('input[name="age"]').val("");
    const gender = $('input[name="gender"]:checked').val();
    $('input[name="gender"]').eq(0).prop('checked', true);
    if(validate(name, age) === true){
        now_all_users.push(new User(name, age, gender));
        disp_all_users(now_all_users);
        $('h1').after($('<p>', {text: name + 'さんを登録しました', style: 'text-align: center'}));
    }
 
}
const validate = (name, age) => {
    $('span').remove();
    if(name !== '' && age !== ''){
        return true;
    }else{
        if(name === ''){
            $('input[name="name"]').after($('<span>', {text: '名前を入力してください', style: 'margin-left: 5px'}));
        }
        if(age === ''){
            $('input[name="age"]').after($('<span>', {text: '年齢を入力してください', style: 'margin-left: 5px'}));
        }
        return false;
    }
}

const select_user = () => {
    $('h1 + p').remove();
    let select_gender = $('input[name="select_gender"]:checked').val();
    let select_users = now_all_users.filter((user) => {
        if(select_gender === 'all'){
            return user;
        }else if(user.gender === select_gender){
            return user;
        }
    });
    disp_all_users(select_users);
}


$(function(){
    $('h1').text('ユーザ一覧').addClass('title');
    $('#disp').addClass('table_border');
    create_table_title();
    now_all_users = init_data();
    disp_all_users(now_all_users);
    
    $('button').on('click', add_user);
    $('input[name="select_gender"]').on('click', select_user);
});