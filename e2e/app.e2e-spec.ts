import { InvoiceGUIPage } from './app.po';

describe('invoice-gui App', () => {
  let page: InvoiceGUIPage;

  beforeEach(() => {
    page = new InvoiceGUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
