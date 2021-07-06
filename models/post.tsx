import Pet from "./pet";

type Post = {
  id: string,
  type: string,
  pet: Pet,
  description: string,
}

export default Post;