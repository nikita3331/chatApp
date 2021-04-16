 const doc={
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Chat app',
    description: 'Chat app demo',
    termsOfService: 'blank',
    contact: {
      name: 'Mykyta Brazhyskyy',
      email: 'mykyta.brazhynskyy@gmail.com',
      url: 'www.brazhynskyy.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'https://chat-as-a-service.herokuapp.com',
      description: 'Production server'
    }
  ],
  paths: {
    '/users/register': {
      post: {
        tags: ['User'],
        description: 'Register user',
        operationId: 'registerUser',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  login: {
                      type: 'String',
                      description: 'User login',
                      example: 'Nikita',
                      required: true
                  },
                  password: {
                    type: 'String',
                    description: 'User password',
                    example: 'Babcia2',
                    required: true
                  }            
                }
              }
            }
          },
        },
        responses: {
          '200': {
            description: 'Registration was successful',
            content: {
              'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'Boolean'
                      }
                    }
                },
                example: {
                  success: true
                }
              }
            }
          },
          '201': {
            description: 'User already exists',
            content: {
              'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'Boolean'
                      },
                      reason: {
                        type: 'Number'
                      }
                    }
                },
                example: {
                  success: false,
                  reason:0
                }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'Boolean'
                      },
                      reason: {
                        type: 'Number'
                      },
                      message: {
                        type: 'String'
                      }
                    }
                },
                example: {
                  success: false,
                  reason:1,
                  message:'Failed to load from datebase'
                }
              }
            }
          },
        }
      }
    },  
  },


     
tags: [
  {
    name: 'User'
  },
  {
    name: 'Message'
  }
],
};
exports.doc=doc;