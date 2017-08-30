import $ from 'npm-zepto';
import message from './components/message';
import './assets/css/main.css';

$('#show-btn').on('click', () => {
  $('#message-show-bar').html(`message is ${message}`);
});
