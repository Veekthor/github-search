import { IUserCardProps } from "../interfaces";
import { StyledUserCard } from "./styles/Results.styled";
import { IoIosArrowForward } from "react-icons/io";

const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  return (
    <StyledUserCard>
      <div>
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          loading="lazy"
        />
      </div>
      <div>
        <p>{user.login}</p>
        <IoIosArrowForward />
      </div>
    </StyledUserCard>
  );
};

export default UserCard;
