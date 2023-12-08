import { getHeading } from '../support/app.po';

describe('frontend', () => {
  beforeEach(() => cy.visit('/'));

  it('should load', () => {
    getHeading().contains(
      'Your Trusted Marketplace for X-Ray & Laboratory Equipment'
    );
  });
});
