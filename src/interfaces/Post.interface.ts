export default interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  published: Date;
  updated: Date;
}