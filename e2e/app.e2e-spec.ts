import { QualityEnhancementCellPage } from './app.po';

describe('quality-enhancement-cell App', () => {
  let page: QualityEnhancementCellPage;

  beforeEach(() => {
    page = new QualityEnhancementCellPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
