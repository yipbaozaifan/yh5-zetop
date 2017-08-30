import $ from 'npm-zepto';
import './assets/css/main.css';

$('#show-btn').on('click', () => {
  $.ajax({
    method: 'get',
    url: '/message',
    success: (res) => {
      $('#message-show-bar').html(`message is ${res}`);
    },
  });
});
