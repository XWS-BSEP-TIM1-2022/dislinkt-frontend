import { User } from "../registration/user";

export class PostComment {
    id : string = "";
    userId : string | null = "";
    postId : string = "";
    text : string = "";
    user: User = new User("", "", "", "", 0, "", "", "", "", "", [], [], false, false);;
}
