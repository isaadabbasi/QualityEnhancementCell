import { QecPage } from './app.po';

describe('qec App', function() {
  let page: QecPage;

  beforeEach(() => {
    page = new QecPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
