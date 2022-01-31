import * as companyController from './company.controller';
import { Request, Response } from 'express';
import db from '../../models';

/**
 * This is another example of writing unit test.
 * You can see from here that there is no real call made in test
 * everthing was mocked
 */
describe("company controler mock test", () => {
  it("get company data with compay and thier employees", async () => {
    const allCompnaies = [
      {
        id: 1,
        name: "New Company",
        email: "fake email",
        phone: "fake phone",
        website: "fake website",
        Employess: [
          {
            firstName: "fake first name",
            lastName: "fake last name",
            email: "fake email",
            phone: "fake last name",
          },
        ],
      },
    ];

    const mockFindAll = jest.fn(() => Promise.resolve(allCompnaies));
    db.companies.findAll = mockFindAll;

    const mockSend = jest.fn();
    const req: Request = {};
    const res: Response = {
      send: mockSend,
      status: jest.fn(200),
    };

    await companyController.findAll(req, res);
    expect(mockSend).toHaveBeenCalled();
    expect(mockFindAll).toHaveBeenCalled();
  });
});
