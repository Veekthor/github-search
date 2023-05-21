import Header from "../../components/Header";
import renderer from "react-test-renderer";

describe('Header tests', () => {
  it('should match snapshot', () => {
    expect(true).toBe(true);
    const component = renderer.create(<Header />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})