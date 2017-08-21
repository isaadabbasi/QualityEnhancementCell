<<<<<<< HEAD
import { QualityEnhancementCellPage } from './app.po';

describe('quality-enhancement-cell App', () => {
  let page: QualityEnhancementCellPage;

  beforeEach(() => {
    page = new QualityEnhancementCellPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
=======
import { QecPage } from './app.po';

describe('qec App', function() {
  let page: QecPage;

  beforeEach(() => {
    page = new QecPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
>>>>>>> 787950fb9cfc24e1bdf2a685b1d330d04cb8ff80
  });
});
