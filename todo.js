'use strict';

//  現在のやること'todo-List'
let todoList;
window.onload = function () {
    todoList = document.getElementById('todo-list');
}

//  タスクを追加
function addTask() {
    //  入力された文字列'task-name'を要素とするtaskNameを作成
    let taskName = document.getElementById('task-name');

    //  未入力(スペースのみ含む)でタスク追加ボタンを押されたら処理を終了
    if(taskName.value.trim() == '' ) return false;

    //  新しくli要素を作成
    let li = document.createElement('li');

    //  taskNameという値を持つp要素を作成。liの後ろにp要素を追加
    let p = document.createElement('p');
    p.innerHTML = taskName.value;
    li.appendChild(p);

    //  liの後ろに完了ボタンを追加
    //  createTaskButton関数の内容は一番下に記載
    let endButton = createTaskButton('end-button', '完了');
    li.appendChild(endButton);

    //  liの後ろに削除ボタンを追加
    let deleteButton = createTaskButton('delete-button', '削除');
    li.appendChild(deleteButton);

    //  todoListの最後尾に新しいli(taskName・完了ボタン・削除ボタン)を追加
    todoList.appendChild(li);

    //  タスク入力欄を空欄にする
    taskName.value = "";

    //  完了ボタンクリックでタスクに取消線を引く
    endButton.addEventListener('click', function(e){
        //  デフォルト動作(タスク追加ボタンの動作)をキャンセルする
        e.preventDefault();
        //  ボタンが非活性の状態になり押せなくなる
        this.setAttribute('class', 'end-button disabled');
        //  取消線を引く
        this.previousElementSibling.setAttribute('class', 'line-through');
    });

    //  削除効果音の定義
    const sound = new Audio('del_btn.mp3');

    //  削除ボタンクリックでタスク削除&効果音を鳴らす
    deleteButton.addEventListener('click', function(e){
        //  デフォルト動作(タスク追加ボタンの動作)をキャンセルする
        e.preventDefault();
        //  押した削除ボタンに対応するli(taskName・ボタン)を削除
        todoList.removeChild(this.closest('li'));
        //  効果音を最初(0秒)から鳴らす(0秒は連続クリックへの対策)
        sound.currentTime = 0;
        sound.play();
    });
}

//  効果音を鳴らす(タスク追加用)
function audio() {
    //  効果音を最初(0秒)から鳴らす
    document.getElementById('btn_audio').currentTime = 0;
    document.getElementById('btn_audio').play();
}

//  タスク内に完了・削除ボタンを作成。'button'はタスク追加ボタンのこと
//  タスク追加ボタンを再利用してclassnameとnameの値を持ったボタンを作る
//  追加ボタンと同じ動作をしてしまうので、完了・削除ボタンでは動作のキャンセルが必要
function createTaskButton(className, name) {
    let btn = document.createElement('button');
    btn.setAttribute('class', className);
    btn.innerHTML = name;
    return btn;
}
