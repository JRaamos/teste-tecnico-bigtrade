export default interface Post {
  id?: string;
  title: string;
  content: string;
  userId: number;
  published: Date;
  updated: Date;
}