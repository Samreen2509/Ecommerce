// User roles constants
export const availableUserRoles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};
export const availableUserRolesEnum = Object.values(availableUserRoles);

// URI base path
export const BASEPATH = '/api/v1';
export const CLIENT_BASEPATH = 'http://localhost:1234';
export const RESET_PASS_PAGE = '/resetPassword';
export const EMAIL_VERIFY_PAGE = '/emailVerify';

// Local http PORT
export const PORT = 5000;

// cookie options
export const cookieOptions = {
  secure: true,
  httpOnly: true,
  sameSite: 'none',
  path: '/',
  maxAge: 864000000, // 10 days
};

// order status enum
export const orderStatus = {
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
  DELIVERED: 'DELIVERED',
};

// allowed image extensions
export const allowedImgExtensions = {
  jpg: '.jpg',
  png: '.png',
  jpeg: '.jpeg',
  webp: '.webp',
};
export const allowedImgExtensionsEnum = Object.values(allowedImgExtensions);
// export const orderStatusEnum = Object.values(orderStatus);
