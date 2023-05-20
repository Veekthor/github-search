import { useContext } from "react";
import { SearchedContext } from "../context/SearchContext";
import { BsFillGearFill } from "react-icons/bs";
import { MdOutlineSearchOff } from "react-icons/md";
import UserCard from "./UserCard";
import { StyledResults } from "./styles/Results.styled";

const Results: React.FC = () => {
  const { result, isLoading } = useContext(SearchedContext);
  return (
    <StyledResults>
      {isLoading && (
        <p>
          <BsFillGearFill className="rotate" />
        </p>
      )}
      {!isLoading &&
        result &&
        result?.map((user) => <UserCard key={user.id} user={user} />)}
      {!isLoading && result && result?.length === 0 && (
        <>
          <p>
            <MdOutlineSearchOff />
          </p>
          <p>No Results Found</p>
        </>
      )}
    </StyledResults>
  );
};

export default Results;
