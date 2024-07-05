import conf from "../conf/conf";
import { Client, Query, Storage, Databases, ID } from "appwrite";

export class Service {
  client = new Client();
  bucket;
  database;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.bucket = new Storage();
    this.database = new Databases();
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, //ID.unique() would also work
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug //ID.unique() would also work
      );
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, //ID.unique() would also work
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throw error;
    }
  }
  // used to query single post with id
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug //ID.unique() would also work
      );
    } catch (error) {
      throw error;
      return false;
    }
  }
  // used to get all posts but with some condition
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        queries
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
