// 编写你的测试用例

import message from '@/components/message.js';

describe('message.js', () => {
  it('should render correct contents', () => {
    expect(message)
      .to.equal('hello world');
  });
});
