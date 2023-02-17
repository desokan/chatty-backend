import HTTP_STATUS from 'http-status-codes';

// 001. And then the next thing is I want to create an interface. So we're creating a TypeScript interface. So this interface is like a contract of how the data that you want to define or the data that you're expecting should look like. So for our error response, I would define it as this.
export interface IErrorResponse {
  // 002. In here, we will have a message of type string. We have the statusCode of type number. We have the status of type string. And then we'll have a method called serializeErrors and it is going to be a method and it's going to be of another type called IError. This has not been defined.

  // 003. So what is going to happen is when we get the error, because our custom error class will extend the JavaScript error and the JavaScript error has the, error message, the statusCode, the status. And then we are creating these serialized errors.
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

// 004. Now let me define the IError interface next. And then this will also contain message of type string statusCode of type number and status of type string. So inside the serializedErrors in 003 above, we are going to have these properties we have in the IError interface.
export interface IError {
  message: string;
  statusCode: number;
  status: string;
}

// 005. Now let us create the class. So we're going to create an abstract class, and then the abstract class will contain two abstract properties, the statusCode and the status. And so we define an abstract class and an abstract class is basically a class that is defined to be a base class. So it's just going to be a base class for us. So I'll call this customError, but this will extend the Error class.

// 006. So we are creating our own customError class and it's extending this Error right here, the ErrorConstructor (hover your mouse on the Error being extended). So every property or assessable property or methods that are available in this Error class will be made available to us right here in this customError. And then we are going to have the statusCode, we are going to have the status.
export abstract class CustomError extends Error {
  // 007. And we need to define two abstract properties. Now, what this means is any other class that extends our customError abstract class, we will have to define this abstract properties. So errorCode of type number. And then abstract status of type string.
  abstract statusCode: number;
  abstract status: string;

  // 008. And now we are going to call the constructor. And will passing message of type string. So any class that extends the customError will pass in a message and now we need to call super. Now we are calling the super because this customError class is extending the Error constructor. So this basically means that whatever is defined in the Error constructor will be made available in our customError class. And the constructor takes in the message.
  constructor(message: string) {
    // 009. If you go to your config.fs file, you will see that we are throwing a new Error there. And in that Error, you can see it takes in a message. If you hover on that Error, if you instantiate it, it takes in a message. That is what we are passing right here. So if you are attending a class and you want to make use of its constructor, when you define your own constructor in your class, then you need to call the super method and then pass in the property.

    // 010. For example, had it been that the Error method accepts multiple properties like message and other values, then when we call this super, we need to pass in all those values. But in this case it only accepts a message which is of type string as you will notice in the config.ts file <throw new Error(`Configuration ${key} is undefined.`);>. That is why we are passing it right here.
    super(message);
  }

  // 011. And now we want to define another I call this serializeErrors. It will be of type IError and then this will just return message, status and statusCode.

  // 012. So what is happening here is this message will be a message written by the by the user or whatever message we pass. But this status and statusCodes, they are coming from the Error class in 006 above. For example, right inside the serializeErrors() block, not inside the return(), if I do 'this.', you can VSCode will show you the properties that are available. We have stcck, we have status we have statusCode etc. So when we call this serializeErrors method, these properties we are returning are are the properties that will be returned.
  serializeErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
}

// 021. Let's also define JoiRequestValidationError. This is going to be our validation error and it's going to have 400 bad requests. So you can define as much error class as you want. Later, when we implement our validation, whenever there is an error with our validation, this is the class that will be called. So this is how you define your custom error class and then you define the actual classes that you need to call.
export class JoiRequestValidationError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

// 013. So we've created our customError class. Now let us define our first error class. I'll export a class I will call BadRequestError. And it will extend our customError.
export class BadRequestError extends CustomError {
  // 014. And now inside, we define our statusCode, you can see it's available, but we set the statusCode HTTP_STATUS.BAD_REQUEST. And I think BAD_REQUEST is 400. Next, is the status. He's going to be error.
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  // 015. We can define our own constructor. We pass in the message of type string and then we call super and we pass in message. So this super here is going to call the constructor of the customError class in 006 above.

  // 016. Now, if we want to use this BadRequestError, all we just need to do this<throw new BadRequestError('and then we pass in our message here')> So this is how we are going to use the class and this is how we define it.
  constructor(message: string) {
    super(message);
  }
}

// 017. We can define others like NotFoundError. and NOT_FOUN, I think, is 404.
export class NotFoundError extends CustomError {
  statusCode = HTTP_STATUS.NOT_FOUND;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

// 018. Next, I will define NotAuthorizedError.
export class NotAuthorizedError extends CustomError {
  statusCode = HTTP_STATUS.UNAUTHORIZED;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

// 019. Next, I will define FileTooLargeError.
export class FileTooLargeError extends CustomError {
  statusCode = HTTP_STATUS.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

// 020. And then ServerError.
export class ServerError extends CustomError {
  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}
