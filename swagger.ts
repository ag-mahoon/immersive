import swaggerAutogen from 'swagger-autogen'
import outputFile from './swagger_output.json'

const endpointsFiles = [
    './src/routes/login.route.js',
    './src/routes/welcome.route.js',
    './src/routes/company.routes.js',
    './src/routes/employee.routes.js'
]

swaggerAutogen(outputFile, endpointsFiles)