// src/config/constants.js

export const ROLES = {
  GUEST: "guest",
  HOST: "host",
  STAFF: "staff",
  MODERATOR: "moderator",
  ADMIN: "admin",
};

export const API_ENDPOINTS = {
  LOGIN: "/api/auth/guest/login",
  REGISTER: "/api/auth/guest/register",
  // Add more endpoints as needed
};

export const PAYMENT_METHODS = {
  VNPAY: "vnpay",
  MOMO: "momo",
  CASH: "cash",
};

export const DISPUTE_STATUS = {
  PENDING: "pending",
  REVIEW: "review",
  CLOSED: "closed",
};
