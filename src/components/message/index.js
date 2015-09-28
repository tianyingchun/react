import React from 'react';
import Notification from 'rc-notification';
if (process.env.BROWSER) {
  require('./message.less');
}
let defaultDuration = 1.5;
let top;
let messageInstance;
let key = 1;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls: 'message',
    transitionName: 'move-up',
    style: {
      top: top
    }
  });
  return messageInstance;
}

function notice(content, duration = defaultDuration, type, onClose) {
  let iconClass = ({
    'info': 'glyph-notification message-info',
    'success': 'glyph-notification message-success',
    'danger': 'glyph-notification message-danger',
    'loading': 'glyph-spinner glyph-spin message-loading'
  })[type];

  let instance = getMessageInstance();
  let noticeContent = (
    <div className="message-custom-content">
      <i className={'glyph-icon ' + iconClass}></i>
      <span>{content}</span>
    </div>
  );

  instance.notice({
    key: key,
    duration: duration,
    style: {},
    content: noticeContent,
    onClose: onClose
  });

  return (function() {
    let target = key++;
    return function() {
      instance.removeNotice(target);
    };
  })();
}

export default {
  info(content, duration, onClose) {
    return notice(content, duration, 'info', onClose);
  },
  success(content, duration, onClose) {
    return notice(content, duration, 'success', onClose);
  },
  error(content, duration, onClose) {
    return notice(content, duration, 'danger', onClose);
  },
  loading(content, duration, onClose) {
    return notice(content, duration, 'loading', onClose);
  },
  config(options) {
    if (options.top) {
      top = options.top;
    }
  }
};
