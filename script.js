// 選択された席の情報を保持する変数
let seatChoices = {};
let confirmedSeats = [];
let conflictingSeats = [];

// 席を選択して送信ボタンが押されたときの処理
function submitChoice() {
  const studentNumber = document.getElementById('student-number').value;
  const seatChoice = document.getElementById('seat-choice').value;

  if (!studentNumber || !seatChoice) {
    alert("出席番号と席番号を入力してください。");
    return;
  }

  // 席の選択を保存
  if (seatChoices[seatChoice]) {
    // すでにその席が選ばれている場合
    seatChoices[seatChoice].push(studentNumber);
    conflictingSeats.push(seatChoice);
  } else {
    // 初めてその席が選ばれた場合
    seatChoices[seatChoice] = [studentNumber];
  }

  updateResults();
}

// 確定席と重複席の表示を更新
function updateResults() {
  const confirmedList = document.getElementById('confirmed-seats');
  const conflictingList = document.getElementById('conflicting-seats');

  confirmedList.innerHTML = '';
  conflictingList.innerHTML = '';

  for (let seat in seatChoices) {
    if (seatChoices[seat].length === 1) {
      confirmedSeats.push(seat);
      const li = document.createElement('li');
      li.textContent = `席 ${seat}: 出席番号 ${seatChoices[seat][0]} が確定`;
      confirmedList.appendChild(li);
    } else {
      const li = document.createElement('li');
      li.textContent = `席 ${seat}: 出席番号 ${seatChoices[seat].join(", ")} が重複`;
      conflictingList.appendChild(li);
    }
  }
}