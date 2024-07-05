import { current } from "@reduxjs/toolkit";
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account();
  }

  async createAccount({ email, password, userName }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        userName
      );
      if (userAccount) {
        return this.loginAccount({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginAccount({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async userLogout() {
    try {
      return  await account.deleteSession('current');
    } catch (error) {
      throw error;
    }
  }




}
const authService = new AuthService();

export default AuthService;
