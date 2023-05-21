import renderer from "react-test-renderer";
import UserCard from "../../../components/UserCard";
import data from "../../../data";

describe('UserCard tests', () => {
  it('should match snapshot', () => {
    expect(true).toBe(true);
    const user = data.items[0];
    const component = renderer.create(<UserCard user={user} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})