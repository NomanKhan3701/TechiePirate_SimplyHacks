import "./CommentCard.scss";
import { TbPlant2 } from "react-icons/tb";
import { FaDonate } from "react-icons/fa";
import { getDefaultPhoto } from "../../utils";

const CommentCard = ({ comment }) => {
  return (
    <div className="comment">
      <div className="author">
        <img src={comment?.author?.image || getDefaultPhoto(comment?.author)} />
        <div>
          {comment?.author?.firstName + " " + comment?.author?.lastName}
          <span>
            <TbPlant2 />
            <span>{comment?.author?.workPts}</span>
            <div style={{ width: "16px" }}></div>
            <FaDonate />
            <span>{comment?.author?.resourcePts}</span>
          </span>
        </div>
      </div>

      <div className="content">{comment?.comment}</div>
    </div>
  );
};

export default CommentCard;
