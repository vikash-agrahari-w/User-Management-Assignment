export const CONSTANT = {
  LOGGER_NAME: 'LOGGER',
  BASIC_PASSWORD: 'Xyz@1234',
  BASIC_USERNAME: 'XYZ',
  SWAGGER_PATH: (appPort: number) => {
    return `http://localhost:${appPort}/swagger#/`;
},
  PDF_REPORT_HEADERS: ['Id', 'Name', 'Email', 'Phone Number', 'Address'],
};

export const Swagger = {
  Title: 'User Management Project',
  Description: 'A Documentation for user management APIs',
  Version: '1.0',
  AddApiKey: {
    Type: 'apiKey',
    Name: 'Authorization',
    In: 'header',
  },
  AuthType: 'basic',
  Path: 'swagger',
};
